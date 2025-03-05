import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateModal = ({ isOpen, close, id, setReload }) => {
  const [selected, setSelected] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleUpdate = async (id) => {
    if (!selected) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Have to select a date!",
      });
    }

    try {
      await axiosSecure.patch(`/booking/${id}`, {
        date: new Date(selected).getTime(),
      });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Date has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
      setReload((prev) => !prev);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      close();
    }
  };

  return (
    <Dialog
      open={isOpen}
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
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white mb-5"
            >
              Select a new date
            </DialogTitle>
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
            <div className="mt-10  flex items-center  justify-between ">
              <button
                onClick={() => handleUpdate(id)}
                className=" items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
              >
                update
              </button>
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={close}
              >
                close
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
UpdateModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  id: PropTypes.string,
  setReload: PropTypes.bool,
};

export default UpdateModal;
