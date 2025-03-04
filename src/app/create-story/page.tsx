"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext to get the logged-in user

export default function AddStory() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth(); // Get the logged-in user from context

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!title || !content) {
      setError("Title and Content are required");
      return;
    }

    if (!user) {
      setError("You must be logged in to add a story.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "stories"), {
        title,
        content,
        author: user.displayName || "Anonymous",
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      setError("Failed to add story. Try again.");
      console.error("Error adding story:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Story</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Write your story here..."
            className="w-full p-3 border border-gray-300 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-green-600 bg-white text-gray-900"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-800 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Publish Story"}
          </button>
        </form>
      </div>
    </div>
  );
}
