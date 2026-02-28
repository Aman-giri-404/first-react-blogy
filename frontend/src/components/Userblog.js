import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "./Breadcrumbs";

export default function Userblog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const authorId = localStorage.getItem("authorId");

      if (!authorId) {
        toast.error("User not logged in");
        setBlogs([]);
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/blog/userblog?authorId=${authorId}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      console.log("API RESPONSE:", data);

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const authorId = localStorage.getItem("authorId");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/blog/delete/${id}?authorId=${authorId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        toast.error("Delete Failed");
      } else {
        toast.success("Blog Deleted");
        fetchBlogs();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-6">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs />
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-12 text-center">
          My Blogs
        </h1>

        {loading ? (
          <div className="text-center text-lg font-semibold text-gray-600">
            Loading blogs...
          </div>
        ) : blogs?.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No blogs available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-indigo-600">
                      {blog.title}
                    </h3>

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        blog.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {blog.content}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/update/${blog._id}`)}
                      className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition duration-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteBlog(blog._id)}
                      className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition duration-200"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold tracking-wide transition duration-200"
                  >
                    Read Full Blog →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
