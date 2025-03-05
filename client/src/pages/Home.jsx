import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useLoaderData } from "react-router-dom";
import Map from "../components/Map";
import RoomCard from "../components/RoomCard";
import Reviews from "./Reviews/Reviews";

const Home = () => {
  const roomData = useLoaderData();

  let settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className="container mx-auto my-10 p-2">
      {/* banner slider */}
      <div className="mb-20">
        <Slider {...settings}>
          {/* slider-1 */}
          <div className="rounded-lg">
            <div
              className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center rounded-lg"
              style={{
                backgroundImage:
                  "url('https://cdn.airalo.com/images/681b2b17-6a84-4dda-84b7-b6bc8256adb1.jpg')",
              }}
            >
              {/* Content */}
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome to Hotel Booking
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  Hotel booking is reserving a hotel room for a specific period,
                  often online or via an app.
                </p>
                <Link
                  to={"/rooms"}
                  className="px-6 py-3 bg-[#008489] hover:bg-[#008489e5] text-white rounded-lg font-semibold"
                >
                  Book Now
                </Link>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            </div>
          </div>
          {/* slider-2 */}
          <div className="rounded-lg">
            <div
              className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center rounded-lg"
              style={{
                backgroundImage:
                  "url('https://greeking.me/images/blog/images/Italy-Vacations/Weather-in-Italy-in-June/weather-in-italy-in-june-intro.jpg')",
              }}
            >
              {/* Content */}
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Latest reviews. Lowest prices.
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  compares prices from 200+ booking sites to help you find the
                  lowest price on the right hotel for you.
                </p>
                <Link
                  to={"/rooms"}
                  className="px-6 py-3 bg-[#008489] hover:bg-[#008489e5] text-white rounded-lg font-semibold"
                >
                  Book Now
                </Link>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            </div>
          </div>
          {/* slider3 */}
          <div className="rounded-lg">
            <div
              className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center rounded-lg"
              style={{
                backgroundImage:
                  "url('https://blog.italotreno.com/wp-content/uploads/2022/04/costiera-amalfitana.jpg')",
              }}
            >
              {/* Content */}
              <div className="relative z-10 text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Explore Destinations
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  Explore Destinations is discovering and learning about new
                  travel locations for adventure, relaxation, or cultural
                  experiences.
                </p>
                <Link
                  to={"/rooms"}
                  className="px-6 py-3 bg-[#008489] hover:bg-[#008489e5] text-white rounded-lg font-semibold"
                >
                  Book Now
                </Link>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
            </div>
          </div>
        </Slider>
      </div>
      {/* map section */}
      <div>
        <h1 className="text-center text-3xl font-bold mb-10 dark:text-white">
          Location of <span className="text-[#008489]">Hotels</span>
        </h1>
        <Map />
      </div>
      {/* Featured Rooms */}
      <div className="mt-20">
        <h1 className="text-center text-3xl font-bold mb-10 dark:text-white">
          Featured <span className="text-[#008489]">Rooms</span>
        </h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {roomData.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      </div>
      {/* user reviews */}
      <Reviews />
      {/* offers */}
      <div className="mt-20">
        <h1 className="text-center text-3xl font-bold mb-10">
          <span className="text-[#008489]">Offers</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black text-center lg:text-left">
          {/* offer-1 */}
          <div className="lg:flex justify-between items-center border p-6 rounded-lg">
            <div className="mb-3 space-y-4">
              <h1 className="font-bold text-2xl dark:text-white ">
                Go for a good time, not a long time
              </h1>
              <p className="text-lg dark:text-white">
                Finish your year with a mini break. Save 15% or more when you
                book <br /> and stay by January 7, 2025
              </p>
              <button className="p-3 bg-[#3B82F6] rounded-lg text-white">
                Find the best deal
              </button>
            </div>
            <div className="mt-5 lg:mt-0">
              <img
                className="lg:w-32 rounded-md"
                src="https://q-xx.bstatic.com/xdata/images/xphoto/500x500/372051085.jpeg?k=f5182852fa2c998e2b47cfd922da41ae16c42beb02fb70ecb57ee55ced3271f6&o="
                alt=""
              />
            </div>
          </div>
          {/* offer-2 */}
          <div className="lg:flex justify-between items-center border p-6 rounded-lg">
            <div className="mb-3 space-y-4">
              <h1 className="font-bold text-2xl dark:text-white ">
                Save on stays worldwide
              </h1>
              <p className="text-lg dark:text-white">
                Finish your year with a mini break. Save 15% or more when you
                book <br /> and stay by January 7, 2025
              </p>
              <button className="p-3 bg-[#3B82F6] rounded-lg  text-white ">
                Save 18% or more
              </button>
            </div>
            <div className="mt-5 lg:mt-0">
              <img
                className="lg:w-32 rounded-md"
                src="https://r-xx.bstatic.com/xdata/images/xphoto/500x500/420460173.jpeg?k=0654940492bab9993284109d6136f220e700bbb4d5a0a972c4b4de3bdc0d8204&o="
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe */}
      <h1 className="text-center text-3xl font-bold mt-20">
        <span className="text-[#008489]">Subscribe</span>
      </h1>
      <div className="bg-[url('https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Fbanner%2F3.jpg&w=1920&q=100')] bg-center rounded-lg py-20 px-1  lg:p-20 text-right lg:flex items-center justify-between mt-10">
        <div></div>
        <div className="text-white text-center lg:text-left">
          <h1 className="font-bold lg:font-black text-2xl lg:text-5xl lg:mb-6 mb-3">
            Subscribe and get <br /> exclusive deals & offer
          </h1>
          <p className="lg:text-xl text-sm lg:mb-6 mb-3">
            Find and book your dream hotel. The world&apos;s leading luxury
            hotels site.
          </p>
          <div className="join w-full ">
            <input
              className="input bg-white input-bordered join-item w-full"
              placeholder="Email"
            />
            <button className="btn bg-[#3B82F6] border-none hover:bg-[#008489] join-item text-white">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
