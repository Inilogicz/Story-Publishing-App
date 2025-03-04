"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#006634] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Story Platform</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}
