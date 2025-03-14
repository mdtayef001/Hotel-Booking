import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <div className="rounded-2xl shadow-lg bg-white dark:bg-black dark:text-white w-full h-full">
      <img
        className="w-full h-48 object-cover rounded-t-2xl"
        src={room.image}
        alt={room.name}
      />
      <div className="space-y-4 p-5 ">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {room.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-100">
            {room.location}
          </p>
          <p className="text-gray-700 dark:text-white text-base mt-2">
            {room.description}
          </p>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${room.pricePerNight} / night
            </span>
            <span className="text-yellow-500">Rating {room.rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              Total Review: {room.total_review}
            </span>
          </div>
          <div className="mt-2">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-white">
              Amenities:
            </h3>
            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
              {room.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>

        <button>
          <Link
            to={`/rooms/details/${room._id}`}
            className="bg-[#008489] text-white py-2 px-4 rounded-full hover:bg-[#008489dc] font-semibold"
          >
            Book Now
          </Link>
        </button>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object,
};

export default RoomCard;
