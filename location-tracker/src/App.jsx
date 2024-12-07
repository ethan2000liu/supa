import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import supabase from './supabaseClient';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user);
        console.log('User signed in:', session?.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        console.log('User signed out.');
      }
    });

    return () => {
      authListener.subscription?.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Home page with options to log in, sign up, or go to the dashboard */}
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Location Tracker</h1>
              {user ? (
                <div>
                  <p>You are logged in as {user.email}.</p>
                  <Link to="/dashboard">
                    <button>Go to Dashboard</button>
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUser(null);
                    }}
                    style={{ marginLeft: '10px' }}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div>
                  <Link to="/login">
                    <button>Log In</button>
                  </Link>
                  <Link to="/signup" style={{ marginLeft: '10px' }}>
                    <button>Sign Up</button>
                  </Link>
                </div>
              )}
            </div>
          }
        />
        {/* Log In page */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        {/* Sign Up page */}
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/dashboard" />}
        />
        {/* Dashboard page */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
