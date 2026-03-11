import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold animate-pulse">Loading...</h2>
      </div>
    );
  }

  const breadcrumbs = [
    { page: "/", title: "Home" },
    { page: null, title: "User Profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-10">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-indigo-600">
            Welcome, {user.name}
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Profile Information
            </h2>

            <p className="mb-3">
              <strong>Name:</strong> {user.name}
            </p>

            <p className="mb-3">
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Quick Actions
            </h2>

            <button
              onClick={() => navigate("/write-blog")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg mb-3 transition"
            >
              Create Blog
            </button>

            <button
              onClick={() => navigate("/user-blog")}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
            >
              View My Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
