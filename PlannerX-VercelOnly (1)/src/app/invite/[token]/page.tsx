'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AcceptInvite({ params }: { params: { token: string } }) {
  const [msg, setMsg] = useState('Accepting invite...');
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const r = await fetch('/api/invite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: params.token }) });
      const j = await r.json();
      if (r.ok) { setMsg('Invite accepted. Redirecting to dashboard...'); setTimeout(()=> router.push('/dashboard'), 1200); }
      else setMsg(j.error || 'Error');
    })();
  }, [params.token, router]);
  return <div className="card">{msg}</div>
}
