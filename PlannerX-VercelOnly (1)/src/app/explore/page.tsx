'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Explore() {
  const [data, setData] = useState<{ planners: { id:string; title:string; username:string|null }[]}>({ planners: [] });
  useEffect(() => { fetch('/api/explore').then(r=>r.json()).then(setData); }, []);
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Public planners</h2>
      <div className="grid gap-3">
        {data.planners.map(p => (
          <div key={p.id} className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-neutral-600">@{p.username}</div>
              </div>
              {p.username && <Link className="btn" href={`/planner/${p.username}`}>Open</Link>}
            </div>
          </div>
        ))}
        {data.planners.length === 0 && <div className="text-neutral-600">No public planners yet.</div>}
      </div>
    </div>
  );
}
