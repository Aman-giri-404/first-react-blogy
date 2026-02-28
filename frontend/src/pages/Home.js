import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    publicBlogs();
  }, []);

  const publicBlogs = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/blog/public`);
      const data = await res.json();
      setBlogs(data.blogs);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-500">

    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-24 text-center px-6">
      <h1 className="text-5xl font-bold mb-6 tracking-tight">
        Welcome to Mini Blog
      </h1>
      <p className="text-lg opacity-90 max-w-2xl mx-auto">
        Discover amazing stories, ideas, and experiences shared by our community.
      </p>
    </div>

  
    <div className="max-w-7xl mx-auto px-6 py-16">
      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-600">
          Loading blogs...
        </p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No blogs available.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-600">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {blog.content}
                </p>
              </div>

              <button
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="mt-6 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold tracking-wide transition duration-200"
              >
                Read Full Story →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}