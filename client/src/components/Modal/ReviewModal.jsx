import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { data } from "react-router-dom";

const ReviewModal = ({ reviewClose, reviewOpen }) => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    const userName = user.displayName;
    const rating = parseInt(formData.rating.value);
    const comment = formData.comment.value;
    const reviewData = {
      userName,
      rating,
      comment,
      date: Date.now(),
    };

    if (!rating || !comment || rating > 5)
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Have to full fill the requirement",
      });

    try {
      await axiosSecure.post(`reviews`, reviewData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thank You for Feedback",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      reviewClose();
    }
  };

  return (
    <Dialog
      open={reviewOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <Button
              className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              onClick={reviewClose}
            >
              x
            </Button>
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white mb-5"
            >
              Give you review
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={user?.displayName}
                readOnly
                placeholder="Type here"
                className="input w-full max-w-xs"
              />
              <input
                type="number"
                name="rating"
                placeholder="Give your rating between 1-5"
                className="input w-full max-w-xs"
              />

              <textarea
                className="textarea textarea-bordered"
                name="comment"
                placeholder="give your thought"
              ></textarea>
              <div>
                <button className=" items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700">
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
ReviewModal.propTypes = {
  reviewClose: PropTypes.func,
  reviewOpen: PropTypes.bool,
};

export default ReviewModal;
