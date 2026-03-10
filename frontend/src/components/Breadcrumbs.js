import { Link } from "react-router-dom";

function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm mb-4">
      <ul className="flex items-center space-x-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index !== 0 && <span>/</span>}
            {item.page ? (
              <Link to={item.page} className="hover:text-blue-600">
                {item.title}
              </Link>
            ) : (
              <span className="font-semibold text-gray-900">{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
