import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from './supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Sign-up successful! Check your email to confirm.');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <p>{message}</p>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default SignUp;
