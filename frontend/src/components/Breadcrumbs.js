import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  // Split path into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm mb-4">
      <ul className="flex items-center space-x-2 text-gray-600">
        <li>
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-900 font-medium capitalize">
                  {value.replace("-", " ")}
                </span>
              ) : (
                <Link
                  to={to}
                  className="hover:text-blue-600 capitalize"
                >
                  {value.replace("-", " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;