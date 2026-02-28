import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "./Breadcrumbs";

export default function Writingblog() {
  const [title, setTitle] = useState("Untitled Blog");
  const [content, setContent] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const authorId = localStorage.getItem("authorId");

    if (!authorId) {
      toast.error("Please login first");
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/blog/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          title,
          content,
          authorId, 
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to publish blog");
    } else {
      toast.success("Blog Submitted for Approval!");
       setTimeout(() => {
          navigate("/profile");
        }, 1500);
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-indigo-600">Write Blog</h1>
          <ToastContainer position="bottom-right" autoClose={2000} />
          <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
      </div>
          <button
            onClick={() => navigate("/profile")}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-bold outline-none border-b-2 border-gray-300 focus:border-indigo-500 pb-2 mb-6"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="14"
            className="w-full resize-none outline-none text-gray-700 text-lg leading-relaxed"
          />

          <div className="flex justify-end mt-8 gap-4">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-6 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
