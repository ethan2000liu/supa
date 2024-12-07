import React, { useState } from 'react';
import supabase from './supabaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordUpdate = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password updated successfully. You can now log in with your new password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordUpdate}>Update Password</button>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
