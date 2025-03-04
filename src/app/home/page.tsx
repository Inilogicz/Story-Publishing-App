"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import Button from "@/components/Buttons";

interface Story {
  id: string;
  title: string;
  content: string;
}

export default function HomePage() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "stories"));
        const storiesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Story[];
        setStories(storiesList);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#006634]">Stories</h1>

      {loading ? (
        <p className="text-gray-600 mt-4">Loading...</p>
      ) : stories.length === 0 ? (
        <p className="text-gray-600 mt-4">No stories available.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {stories.map(story => (
            <li key={story.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              <p className="text-gray-600 line-clamp-3">{story.content}</p>
              <Button onClick={() => router.push(`/story/${story.id}`)}>Read More</Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
