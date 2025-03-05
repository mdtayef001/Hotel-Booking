// react icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="boxShadow px-10 w-full flex items-center flex-col justify-center pb-[50px] rounded-xl">
      <div className=" p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
        <img
          src="https://i.ibb.co/m5DrBt1/Group-2.png"
          alt="empty/image"
          className="w-full sm:w-[200px]"
        />

        <h1 className="text-[1.4rem] mt-6 font-[500] text-black">No Result</h1>

        <p className="text-3xl font-bold  text-gray-500">404</p>
      </div>

      <Link
        to={"/"}
        className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-[#1C3177] border border-[#1C3177] mt-4 flex items-center gap-[10px]"
      >
        <FaArrowLeftLong /> Back to home
      </Link>
    </div>
  );
};

export default Page404;
