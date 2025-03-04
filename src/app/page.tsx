"use client";
import { useRouter } from "next/navigation";
import Button from "../components/Buttons";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
      <h1 className="text-4xl font-bold text-green-700">Welcome to Story Platform</h1>
      <p className="text-gray-600 mt-4">Share and explore amazing stories from writers.</p>
      
      <div className="mt-6 space-x-4">
        <Button onClick={() => router.push("/login")}>Login</Button>
        <Button onClick={() => router.push("/signup")}>Sign Up</Button>
      </div>
    </div>
  );
}
