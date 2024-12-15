// index.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("access_token")
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate("/login");
        }, 1000)
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex gap-20">
                        <div className="flex flex-shrink-0 items-center gap-2">
                            <img className="h-16 w-16" src="https://img.freepik.com/premium-vector/chef-logo-template-bakery-logo-template_27088-358.jpg?w=1480" alt="Logo" />
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to='/' className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium">
                                Home
                            </Link>

                            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Services
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Contact
                            </a>
                            <Link to="/profile" className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium">
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {token ? (
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                        ) : (
                        <Link to='/login' className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                            Login
                        </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;