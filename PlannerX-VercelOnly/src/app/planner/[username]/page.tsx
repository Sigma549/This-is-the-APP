import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PublicPlanner({ params }: { params: { username: string } }) {
  const profile = await prisma.profile.findUnique({ where: { username: params.username }, include: { user: true } });
  if (!profile) notFound();
  const planner = await prisma.planner.findFirst({ where: { ownerId: profile.userId } });
  if (!planner || !planner.isPublic) {
    return <div className='card'>This planner is private.</div>;
  }
  const todayStart = new Date(); todayStart.setUTCHours(0,0,0,0);
  const tomorrow = new Date(todayStart); tomorrow.setUTCDate(todayStart.getUTCDate()+1);

  const items = await prisma.planItem.findMany({
    where: { plannerId: planner.id, forDate: { gte: todayStart, lt: tomorrow } },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className='grid gap-4'>
      <div className='card'>
        <h2 className='text-xl font-semibold'>{planner.title} — @{profile.username}</h2>
        <p className='text-neutral-600'>Public view of today's items.</p>
      </div>
      <div className='grid gap-2'>
        {items.map(i => (
          <div key={i.id} className='card'>
            <div className='flex items-center gap-3'>
              <input type='checkbox' checked={i.done} readOnly />
              <div className='flex-1'>{i.title}</div>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className='text-neutral-500'>No items today.</div>}
      </div>
    </div>
  );
}
