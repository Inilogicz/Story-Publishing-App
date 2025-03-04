"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase-config"; // Ensure this is correctly set up

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#006634] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Story Platform</h1>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        {user ? (
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
