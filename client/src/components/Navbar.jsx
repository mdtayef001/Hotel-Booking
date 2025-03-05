import { Link, NavLink, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";

import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = UseAuth();
  const navigate = useNavigate();

  const link = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/rooms"}>Rooms</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/myBooking"}>My Booking</NavLink>
        </li>
      )}
    </>
  );

  const handleLogout = () => {
    logOut(() => {
      Swal.fire({
        title: "Logout",
        icon: "success",
        draggable: true,
      });
      navigate("/");
    }).catch((error) => console.log(error.message));
  };

  return (
    <nav className="container mx-auto pt-5 nav">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link to={"/"} className="text-xl lg:text-4xl font-bold">
            Hotel<span className="text-[#008489]">Booking.</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end gap-2 lg:gap-4">
          <div>
            {/* <img src={user.photoURL} alt="" />
             */}
          </div>
          <div className="avatar">
            {user ? (
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            ) : (
              <div className="text-4xl">
                <FaUserCircle />
              </div>
            )}
          </div>
          {user ? (
            <Link
              onClick={handleLogout}
              className="btn text-black dark:text-white"
            >
              Logout
            </Link>
          ) : (
            <Link to={"/auth/login"} className="btn text-black dark:text-white">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
