'use client'
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string|null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const r = await fetch('/api/signup', { method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password, username, displayName }) });
    const j = await r.json();
    if (!r.ok) { setError(j.error || 'Error'); return; }
    window.location.href = "/login";
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-md mx-auto grid gap-3">
      <h2 className="text-xl font-semibold">Create account</h2>
      <div>
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <div>
        <label>Username (unique)</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} />
      </div>
      <div>
        <label>Display name</label>
        <input value={displayName} onChange={e=>setDisplayName(e.target.value)} />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button className="btn primary" type="submit">Create account</button>
    </form>
  );
}
