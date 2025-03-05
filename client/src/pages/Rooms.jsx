import { Link, useLoaderData } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Rooms = () => {
  const Data = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const [roomsData, setRoomsData] = useState(Data);

  const handleSort = async (params) => {
    const { data } = await axiosSecure.get(`/short?low=${params}`);
    setRoomsData(data);
  };

  return (
    <section className="container mx-auto my-20">
      <h1 className="text-center text-3xl font-bold mb-10">
        <span className="text-[#008489]">Rooms</span>
      </h1>

      <div className="text-center mb-10">
        <button
          className="btn btn-lg bg-[#008489] text-white"
          onClick={() => handleSort(!false)}
        >
          Low ot High
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-3">
        {roomsData.map((room) => (
          <div key={room._id}>
            <Link to={`/rooms/details/${room._id}`}>
              <RoomCard room={room} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Rooms;
