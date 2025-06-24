import React, { useState } from 'react';
import { UrlForm } from './components/UrlForm';

export default function App() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  return (
    <div>
      <h1>URL Shortener</h1>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <UrlForm setError={setError} setSuccess={setSuccess} />
    </div>
  );
}