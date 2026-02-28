import { Link, useNavigate, useLocation } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("authorId");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navigation = [
    { name: "Home", href: "/" },
    user && { name: "Profile", href: "/profile" },
  ].filter(Boolean);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
     
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div
              className="bg-gradient-to-tr from-indigo-500 to-purple-600 
                            h-9 w-9 rounded-xl flex items-center 
                            justify-center text-white font-bold 
                            shadow-lg"
            >
              M
            </div>
            <span className="text-white font-semibold text-xl tracking-wide">
              Mini Blog
            </span>
          </div>

         
          <div className="hidden sm:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? "text-white relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-indigo-500"
                    : "text-gray-400 hover:text-white",
                  "text-sm font-medium transition duration-300",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500/90 hover:bg-red-600 
                           text-white px-4 py-2 rounded-xl 
                           text-sm font-medium 
                           shadow-md hover:shadow-lg 
                           transition duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="bg-indigo-600 hover:bg-indigo-700 
                           text-white px-5 py-2 rounded-xl 
                           text-sm font-medium 
                           shadow-md hover:shadow-lg 
                           transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
