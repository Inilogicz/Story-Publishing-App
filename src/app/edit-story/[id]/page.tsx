"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase-config";
import { ArrowLeft, Save, X } from "lucide-react";

export default function EditStoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setContent(data.content);
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

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "stories", id as string);
      await updateDoc(docRef, {
        title,
        content,
      });
      alert("Story updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error updating story:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="text-gray-700 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={22} /> <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-[#006634] text-center mb-6">Edit Your Story</h1>

        {/* Form Fields */}
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Story Title"
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none transition-all shadow-sm text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your story..."
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg h-40 focus:ring-2 focus:ring-green-600 outline-none transition-all shadow-sm text-gray-900"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            <Save size={20} /> <span className="font-medium">Save Changes</span>
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-all shadow-md"
          >
            <X size={20} /> <span className="font-medium">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
}
