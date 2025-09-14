import React from "react";
import { Link } from "react-router-dom";
import Signup from "../pages/Signup.jsx";
import Login from "../pages/Login.jsx";
import Admin from "../pages/Admin.jsx";
function Header() {
  return (
    <div className="w-full bg-gray-600 text-white px-6 py-3 flex items-center justify-between shadow-md">

    <nav className="flex space-x-6">
      <Link to="/" className="hover:text-gray-200 transition-colors ml-200">
        Signup
      </Link>
      <Link to="/login" className="hover:text-gray-200 transition-colors">
        Login
      </Link>
      <Link to="/admin" className="hover:text-gray-200 transition-colors">
        Admin
      </Link>
    </nav>
    </div>
  );
}

export default Header;
