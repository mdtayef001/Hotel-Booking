import { useLoaderData, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import UseAuth from "../hooks/UseAuth";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
import Reviews from "./Reviews/Reviews";

const RoomDetails = () => {
  const [selected, setSelected] = useState(null);
  const { user, loading } = UseAuth();
  const loadData = useLoaderData();
  const { 0: roomData } = { ...loadData };
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleBookNow = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/auth/login");
    const initialData = new FormData(e.target);
    const fromData = Object.fromEntries(initialData.entries());

    const bookingInfo = {
      email: user?.email,
      price: parseInt(fromData.price),
      stayNight: parseInt(fromData.stayNight),
      roomId: roomData._id,
      datePick: new Date(selected).getTime(),
    };

    try {
      await axiosPublic.post("/booking", bookingInfo);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Booking has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/myBooking");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  if (loading) return <Loading />;
  if (roomData?.available_rooms === 0 || roomData?.status === "unavailable") {
    return navigate("/");
  }

  return (
    <>
      <Helmet>
        <title>HotelBooking | Booking Details</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <section className="container mx-auto my-20 dark:text-white p-2">
        <div key={roomData._id}>
          <div className="mb-4">
            <p className="font-bold text-3xl lg:text-5xl mb-5">
              {roomData.name}
            </p>
            <p className="font-semibold text-xl lg:text-2xl flex items-center gap-2">
              <IoLocationSharp />
              {roomData.location}
            </p>
          </div>
          <div className="mb-7">
            <img
              src={roomData.image}
              className="rounded-xl w-full lg:h-[35rem]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-6 mb-4">
            <p className="text-xl font-medium">
              Rating: <b>{roomData.rating}/5</b>
            </p>
            <p className="text-xl font-medium">
              Price Per Night: <b>${roomData.pricePerNight}</b>
            </p>
          </div>
          <div className="font-medium text-lg ">{roomData.description}</div>
          <div className=" my-10">
            <b>Facilities:</b>
            <ul>
              {roomData.amenities.map((fac, i) => (
                <li className="list-inside list-disc" key={i}>
                  {fac}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Reviews />
          </div>

          <div className="text-center lg:my-24 my-10">
            <button
              onClick={handleBookNow}
              className="btn btn-lg lg:w-[20%] text-white bg-[#008489] hover:bg-[#008489]"
            >
              Book Now
            </button>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Your booking details</h3>

                <form action="" onSubmit={handleConfirm} className="space-y-4">
                  <label className="form-control w-full max-w-xs mx-auto">
                    <div className="label">
                      <span className="label-text">price</span>
                    </div>
                    <input
                      type="number"
                      placeholder="price"
                      name="price"
                      defaultValue={roomData.pricePerNight}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-auto">
                    <div className="label">
                      <span className="label-text">Pick Your Date</span>
                    </div>
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                      footer={
                        selected
                          ? `Selected: ${selected.toLocaleDateString()}`
                          : "Pick a day."
                      }
                    />
                  </label>
                  <label className="form-control w-full max-w-xs mx-auto">
                    <div className="label">
                      <span className="label-text">Total length of stay</span>
                    </div>
                    <input
                      type="number"
                      name="stayNight"
                      placeholder="length of stay"
                      required
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                  <p>{roomData.description}</p>

                  <button className="btn btn-lg  text-white bg-[#008489] hover:bg-[#008489]">
                    confirm
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomDetails;
