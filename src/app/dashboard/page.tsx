"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase-config";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  interface Story {
    id: string;
    title: string;
    content: string;
  }

  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStories = async () => {
      const storiesCollection = collection(db, "stories");
      const storySnapshot = await getDocs(storiesCollection);
      setStories(storySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, title: data.title, content: data.content };
      }));
    };

    fetchStories();
  }, []);

interface HandleDelete {
    (id: string): Promise<void>;
}

const handleDelete: HandleDelete = async (id) => {
    await deleteDoc(doc(db, "stories", id));
    setStories(stories.filter((story) => story.id !== id));
};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-[#006634]">Dashboard</h1>
          <Link href="/create-story">
            <button className="bg-[#006634] text-white px-4 py-2 rounded">+ Create Story</button>
          </Link>
        </div>
        <div className="grid gap-4">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div key={story.id} className="bg-white p-4 shadow-md rounded">
                <h2 className="text-xl font-bold">{story.title}</h2>
                <p className="text-gray-600">{story.content.slice(0, 100)}...</p>
                <div className="flex gap-4 mt-2">
                  <Link href={`/edit-story/${story.id}`}>
                    <button className="text-blue-500">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No stories found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
