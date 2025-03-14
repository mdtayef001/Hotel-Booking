import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import Swal from "sweetalert2";

const Login = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const { loginUser, loginWithGoogle } = UseAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const initialData = new FormData(e.target);
    const { email, password } = Object.fromEntries(initialData.entries());

    loginUser(email, password)
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
        <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
        <p className="text-2xl font-medium">Please log into your account</p>
      </div>
      {/* inputs */}
      <div className="mt-10">
        <form onSubmit={handleLogin} className="space-y-9 dark:text-white">
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
          </div>
          <div className="lg:w-[60%] mx-auto">
            <button className="btn w-full text-white bg-[#008489] hover:bg-[#008489dc] text-xl">
              Login
            </button>
          </div>

          <div className="divider lg:w-[60%] mx-auto">Or login with</div>
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
          Don&apos;t Have an Account?{" "}
          <Link to={"/auth/signup"} className="text-[#00969F]">
            Registration
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
