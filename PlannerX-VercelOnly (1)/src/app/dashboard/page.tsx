'use client'
import { useEffect, useState } from "react";

function ymd(d: Date) { return d.toISOString().slice(0,10); }

export default function Dashboard() {
  const [forDate, setForDate] = useState(ymd(new Date()));
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  async function load() {
    const r = await fetch(`/api/items?forDate=${forDate}`);
    if (r.status === 401) { window.location.href = "/login"; return; }
    const j = await r.json();
    setItems(j.items || []);
  }
  useEffect(() => { load(); }, [forDate]);

  async function addItem() {
    if (!title.trim()) return;
    await fetch('/api/items', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ title, forDate }) });
    setTitle("");
    load();
  }
  async function toggleDone(id: string, done: boolean) {
    await fetch('/api/items', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, done }) });
    load();
  }
  async function makePublic(next: boolean) {
    const r = await fetch('/api/planner/public', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ isPublic: next }) });
    if (r.ok) setIsPublic(next);
  }
  async function createInvite() {
    const r = await fetch('/api/share', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ inviteEmail }) });
    const j = await r.json();
    if (r.ok) { alert(`Invite link: ${window.location.origin}${j.inviteUrl}`); setInviteEmail(""); }
    else { alert(j.error || 'Error creating invite'); }
  }

  return (
    <div className="grid gap-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Your daily planner</h2>
        <div className="grid gap-2 md:flex md:items-end md:gap-3">
          <div>
            <label>Date</label>
            <input type="date" value={forDate} onChange={e=>setForDate(e.target.value)} />
          </div>
          <div className="flex-1">
            <label>New item</label>
            <input placeholder="What are you doing?" value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addItem()} />
          </div>
          <button className="btn primary" onClick={addItem}>Add</button>
        </div>
      </div>

      <div className="grid gap-2">
        {items.map(i => (
          <div key={i.id} className="card">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={i.done} onChange={e=>toggleDone(i.id, e.target.checked)} />
              <div className="flex-1">{i.title}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="text-neutral-600">No items yet for this day.</div>}
      </div>

      <div className="card">
        <h3 className="font-medium mb-2">Sharing</h3>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label>Invite by email (optional)</label>
            <input placeholder="friend@example.com" value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)} />
          </div>
          <button className="btn" onClick={createInvite}>Create invite link</button>
        </div>
        <hr/>
        <div className="flex items-center gap-3">
          <span>Public planner</span>
          <button className={"btn " + (isPublic ? "primary" : "")} onClick={()=>makePublic(!isPublic)}>
            {isPublic ? "Public ✓" : "Make public"}
          </button>
        </div>
        <p className="text-sm text-neutral-600 mt-2">Public view: /planner/&lt;your-username&gt;.</p>
      </div>
    </div>
  );
}
