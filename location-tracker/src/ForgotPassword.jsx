import React, { useState } from 'react';
import supabase from './supabaseClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin, // Where users will be redirected after resetting their password
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password reset email sent. Please check your inbox.');
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
