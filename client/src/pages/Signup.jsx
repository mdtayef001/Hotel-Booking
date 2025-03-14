import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { loginWithGoogle, createUser } = UseAuth();
  const [errorMess, setErrorMess] = useState("");
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMess("");
    const initialData = new FormData(e.target);
    const { email, password, name, photoUrl } = Object.fromEntries(
      initialData.entries()
    );
    if (!passwordRegex.test(password)) {
      return setErrorMess(
        "Your Password must have one uppercase,one lowercase & at least 6 characters"
      );
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        });
        Swal.fire({
          title: "Login successful",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(() => {
        Swal.fire({
          title: "Login successful",
          icon: "success",
          draggable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };

  return (
    <section className="mt-20 p-2">
      <div className="text-center dark:text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome To HotelBooking.</h1>
        <p className="text-2xl font-medium">Please Register for your account</p>
      </div>
      {/* inputs */}
      <div className="mt-10">
        <form onSubmit={handleSignUp} className="space-y-9 dark:text-white">
          {/* name */}
          <div className="lg:w-[60%] mx-auto">
            <label htmlFor="name" className="text-[15px] font-[400]">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
            />
          </div>
          {/* Photo URL */}
          <div className="lg:w-[60%] mx-auto">
            <label htmlFor="name" className="text-[15px] font-[400]">
              Photo URL
            </label>

            <input
              type="url"
              name="photoUrl"
              placeholder="Phot URL"
              required
              className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
            />
          </div>
          {/* email */}
          <div className="lg:w-[60%] mx-auto">
            <label htmlFor="name" className="text-[15px] font-[400]">
              Email
            </label>

            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
            />
          </div>
          {/* password */}
          <div className="lg:w-[60%] mx-auto">
            <label htmlFor="password" className="text-[15px] font-[400]">
              Password
            </label>

            <div className="w-full relative">
              <input
                type={isEyeOpen ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
              />

              {isEyeOpen ? (
                <IoEyeOutline
                  className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                  onClick={() => setIsEyeOpen(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className=" absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
                  onClick={() => setIsEyeOpen(true)}
                />
              )}
            </div>
            {errorMess ? (
              <div role="alert" className="alert alert-error mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMess}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="lg:w-[60%] mx-auto">
            <button className="btn w-full text-white bg-[#008489] hover:bg-[#008489dc] text-xl">
              Signup
            </button>
          </div>

          <div className="divider lg:w-[60%] mx-auto">Or Register with</div>
        </form>
        <div className="lg:w-[60%] mx-auto mt-9">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full text-white bg-[#DD4B39] hover:bg-[#DD4B39] text-xl"
          >
            Google
          </button>
        </div>

        <p className="text-center mt-9 font-semibold">
          Already Have an Account!{" "}
          <Link to={"/auth/login"} className="text-[#00969F]">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
