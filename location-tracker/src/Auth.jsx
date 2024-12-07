import React, { useState } from 'react';
import supabase from './supabaseClient';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Sign-up successful! Check your email for confirmation.');
  };

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setMessage(error ? error.message : 'Login successful!');
  };

  return (
    <div>
      <h2>Login or Sign Up</h2>
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
      <button onClick={handleSignIn}>Log In</button>
      <p>{message}</p>
    </div>
  );
};

export default Auth;
