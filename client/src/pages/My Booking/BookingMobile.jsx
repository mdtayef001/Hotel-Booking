import { useState } from "react";
import PropTypes from "prop-types";
import ReviewModal from "../../components/Modal/ReviewModal";
import UpdateModal from "../../components/Modal/UpdateModal";

const BookingMobile = ({ book, setReload, handleCancel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleUpdate = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  const handleReview = () => {
    setReviewOpen(true);
  };

  const reviewClose = () => {
    setReviewOpen(false);
  };

  const { image, name, price, datePick, _id } = book;

  return (
    <div className="bg-gray-900 text-white w-full p-4 rounded-2xl shadow-lg  space-y-4">
      {/* Hotel Image */}
      <img src={image} alt="Hotel" className="rounded-lg object-cover" />

      {/* Hotel Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-400">
          Price Per Night: <span className="text-white">${price}</span>
        </p>
        <p className="text-gray-400">
          Date: <span className="text-white">{datePick}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={handleCancel}
          className="bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Update
        </button>
        <button
          onClick={handleReview}
          className="bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Review
        </button>
      </div>
      <UpdateModal
        isOpen={isOpen}
        close={close}
        id={_id}
        setReload={setReload}
      />
      <ReviewModal reviewOpen={reviewOpen} reviewClose={reviewClose} />
    </div>
  );
};
BookingMobile.propTypes = {
  book: PropTypes.object,
  setReload: PropTypes.func,
  handleCancel: PropTypes.func,
};

export default BookingMobile;
