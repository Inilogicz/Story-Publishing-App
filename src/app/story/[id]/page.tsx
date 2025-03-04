"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { ArrowLeft, Calendar } from "lucide-react";
// import moment from "moment"; 

interface Story {
  id: string;
  title: string;
  content: string;
  createdAt?: any;
}

export default function StoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStory({ id: docSnap.id, ...docSnap.data() } as Story);
        } else {
          console.error("Story not found!");
        }
      } catch (error) {
        console.error("Error fetching story:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600 text-lg font-medium">
        Loading...
      </div>
    );
  }

  if (!story) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg font-medium">
        Story not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-all"
          >
            <ArrowLeft size={22} />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Story Content */}
        <h1 className="text-4xl font-extrabold text-[#006634]">{story.title}</h1>
        
        {story.createdAt && (
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            {/* <Calendar size={16} /> */}
            {/* <span>{moment(story.createdAt.toDate()).format("MMMM D, YYYY")}</span> */}
          </div>
        )}

        <p className="text-gray-700 mt-6 leading-relaxed text-lg">
          {story.content}
        </p>
      </div>
    </div>
  );
}
