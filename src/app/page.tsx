"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Story {
  id: string;
  title: string;
  content: string;
  createdAt?: any;
}

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const storiesCollection = collection(db, "stories");
        const storiesSnapshot = await getDocs(storiesCollection);
        const storiesList = storiesSnapshot.docs.map((doc) => {
          const data = doc.data() as Story;
          return {
            id: doc.id,
            title: data.title,
            content: data.content,
            createdAt: data.createdAt,
          };
        });
        setStories(storiesList);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "stories", id));
      setStories(stories.filter((story) => story.id !== id));
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#006634] mb-6 text-center">
          Published Stories
        </h1>

        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {loading ? "Loading stories..." : stories.length === 0 ? "No stories published yet." : `${stories.length} stories available`}
          </p>
          <Link
            href="/create-story"
            className="bg-[#006634] text-white px-5 py-2 rounded-lg shadow hover:bg-green-800 transition-all"
          >
            + Add Story
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Fetching stories...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all">
                <h2 className="text-xl font-semibold text-gray-800">{story.title}</h2>
                <p className="text-gray-600 mt-2">{story.content.substring(0, 120)}...</p>

                <div className="mt-4 flex justify-between">
                  <Link
                    href={`/story/${story.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-all"
                  >
                    Read More
                  </Link>
                  <div className="flex gap-3">
                    <Link
                      href={`/edit-story/${story.id}`}
                      className="text-yellow-500 hover:text-yellow-700 transition-all"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="text-red-500 hover:text-red-700 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
