import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "PlannerX",
  description: "Cross-device planner with public & shared views"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-100 text-neutral-900">
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-semibold">PlannerX</Link>
            <div className="ml-auto flex items-center gap-3">
              <Link href="/signup" className="text-sm underline">Sign up</Link>
              <Link href="/login" className="text-sm underline">Log in</Link>
              <Link href="/explore" className="text-sm underline">Explore</Link>
              <Link href="/dashboard" className="text-sm underline">Dashboard</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
