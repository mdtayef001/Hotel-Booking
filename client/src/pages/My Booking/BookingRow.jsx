import PropTypes from "prop-types";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import UpdateModal from "../../components/Modal/UpdateModal";
import ReviewModal from "../../components/Modal/ReviewModal";

const BookingRow = ({ book, handleCancel, setReload }) => {
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
    <>
      <tr>
        <td>
          <div className="w-11">
            <img src={image} alt="Avatar Tailwind CSS Component" />
          </div>
        </td>
        <td>{name}</td>
        <td>${price}</td>
        <td>{datePick}</td>
        <th className="space-x-2">
          <button
            onClick={() => handleCancel(_id)}
            className="btn btn-xs bg-red-500 text-white"
          >
            Cancel
            <MdDeleteForever />
          </button>
          <button
            onClick={() => handleUpdate()}
            className="btn btn-ghost btn-xs bg-warning text-black"
          >
            Update
            <MdEditSquare />
          </button>
          <button
            onClick={handleReview}
            className="btn bg-green-500 text-black btn-xs "
          >
            Review
          </button>
        </th>
      </tr>
      <UpdateModal
        isOpen={isOpen}
        close={close}
        id={_id}
        setReload={setReload}
      />
      <ReviewModal reviewOpen={reviewOpen} reviewClose={reviewClose} />
    </>
  );
};

BookingRow.propTypes = {
  book: PropTypes.object,
  handleCancel: PropTypes.func,
  setReload: PropTypes.bool,
};

export default BookingRow;
