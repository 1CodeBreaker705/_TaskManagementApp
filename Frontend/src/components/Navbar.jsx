import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { useMainContext } from "../context/MainContext";


const Navbar = () => {
  const { user, logoutHandler } = useMainContext();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

 
  return (
    <header className="text-gray-600 body-font border-b border-gray-200 fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex flex-wrap p-3 lg:p-4 items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        {user ? (
          <ul className="hidden md:flex items-center gap-x-2">
            <li>
              <Link
                to="/"
                className="px-3 py-1 lg:px-4 lg:py-2 rounded-sm bg-indigo-600 text-white border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="px-3 py-1 lg:px-4 lg:py-2 rounded-sm bg-indigo-600 text-white border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/analytics"
                className="px-3 py-1 lg:px-4 lg:py-2 rounded-sm bg-indigo-600 text-white border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer"
              >
                Analytics
              </Link>
            </li>
            <li>
              <Link
                to="/add-task"
                className="px-3 py-1 lg:px-4 lg:py-2 bg-indigo-600 text-white rounded-sm border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer"
              >
               + Add Task
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="px-3 py-1 lg:px-4 lg:py-2 bg-zinc-600 hover:bg-zinc-400 border border-transparent hover:border hover:border-black hover:text-black text-white rounded-sm cursor-pointer transition-all"
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (   
          <ul className="flex items-center justify-center gap-x-5">
            <li>
            <Link
              to="/"
              className="hidden md:inline-block px-3 py-1 lg:px-4 lg:py-2 bg-indigo-600 text-white border border-transparent rounded-sm cursor-pointer hover:bg-indigo-100 hover:text-indigo-500 hover:border-indigo-500 transition-all"
            >
              Home
            </Link>
            </li>
            <li>
            <Link
              to="/register"
              className="hidden md:inline-block px-3 py-1 lg:px-4 lg:py-2 bg-indigo-600 text-white border border-transparent rounded-sm cursor-pointer  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500 transition-all"
            >
              Register
            </Link>
            </li>
            <li>
            <Link
              to="/login"
              className="hidden md:inline-block px-3 py-1 lg:px-4 lg:py-2 bg-indigo-600 text-white border border-transparent rounded-sm cursor-pointer  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500 transition-all"
            >
              Login
            </Link>
            </li>
          </ul>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden px-1 py-1 hover:border-1 rounded-full text-gray-500 hover:text-indigo-500 hover:border-indigo-500"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-14 left-0 w-full bg-white shadow-md md:hidden z-50">
            <ul className="flex flex-col items-center gap-4 py-6">
              {user ? (
                <>
                  <li>
                    <Link
                      to="/"
                      onClick={() => setOpen(false)}
                      className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                    >
                      Home
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="/dashboard"
                      onClick={() => setOpen(false)}
                      className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                    >
                      Dashboard
                    </Link>
                  </li>
                   <li>
                    <Link
                      to="/analytics"
                      onClick={() => setOpen(false)}
                      className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                    >
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-task"
                      onClick={() => setOpen(false)}
                      className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                    >
                      Add Task
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        logoutHandler();
                        setOpen(false);
                      }}
                      className="px-2 py-1 bg-zinc-600 hover:bg-zinc-400 border border-transparent hover:border-black hover:text-black text-white rounded  transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                <li>
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="px-2 py-1 rounded bg-indigo-600 text-white transition-all border border-transparent  hover:bg-indigo-100 hover:text-indigo-500  hover:border-indigo-500"
                  >
                    Login
                  </Link>
                </li>
               </>
              )}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
