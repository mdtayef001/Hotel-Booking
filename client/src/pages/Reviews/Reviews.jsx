import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "swiper/css";
// import required modules
import { Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const reviewFetch = async () => {
      const { data } = await axiosPublic.get("/reviews");
      setReviews(data);
    };
    reviewFetch();
  }, [axiosPublic]);
  return (
    <>
      <div className="lg:mt-24 mt-10">
        <h1 className="text-center text-3xl font-bold lg:mb-24 mb-10">
          <span className="text-[#008489]">Reviews</span>
        </h1>

        <div className="mt-10">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="w-full z-0 md:w-[70%] mx-auto bg-white dark:bg-slate-800 shadow-2xl rounded-lg p-6 flex items-center justify-center flex-col">
                  <h3 className="text-[1.5rem] font-[500] capitalize mt-4">
                    {review.userName}
                  </h3>

                  <div className="flex items-center gap-1 my-4">
                    <span>Rating: {review.rating}</span>
                    <FaStar className="text-[1.3rem] text-[#ffba24]" />
                  </div>

                  <div className="relative">
                    <p className="dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-[#424242]">
                      {review.comment}
                    </p>
                  </div>
                  <p>{new Date(review.date).toString().split("GMT")[0]}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Reviews;
