"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase-config";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
        
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <p className="text-2xl font-semibold mb-4 text-[#006634]">Welcome to Story App</p>
          <h2 className="text-2xl font-semibold mb-4 text-[#006634]">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#006634] text-white py-2 rounded hover:bg-green-700"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-700">
            Don't have an account? <a href="/signup" className="text-red">Sign up</a>
          </p>
        </div>
      </div>
    </>
  );
}