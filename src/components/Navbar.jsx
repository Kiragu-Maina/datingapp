
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">MyApp</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/login" className="text-white hover:text-blue-300 transition duration-300">Login</Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:text-blue-300 transition duration-300">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
