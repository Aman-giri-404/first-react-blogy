import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

export default function Blogmore() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/blog/blogfull/${id}`,
      );

      if (!res.ok) {
        throw new Error("Blog not found");
      }
      const data = await res.json();
      setBlog(data.blog);
    } catch (error) {
      console.error("Error:", error);
      setBlog();
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-lg">Loading blog...</p>;

  if (!blog)
    return <p className="text-center mt-10 text-red-500">Blog not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-6 text-indigo-600">{blog.title}</h1>

      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </p>
    </div>
  );
}
