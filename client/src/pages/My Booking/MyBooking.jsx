import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Loading from "../../components/Loading";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import BookingMobile from "./BookingMobile";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading: userLoading } = UseAuth();
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getBooking = async () => {
      if (!user?.email) return;
      try {
        const { data } = await axiosSecure.get(`/booking/${user?.email}`);
        setBooking(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBooking();
  }, [axiosSecure, user?.email, reload]);

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/booking/${id}`);
        setReload((prev) => !prev);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (userLoading || loading) return <Loading />;

  return (
    <section className="container mx-auto my-20">
      <h1 className="text-3xl text-center font-bold text-[#008489]">
        My Booking
      </h1>
      <div className="mt-5">
        <div className="overflow-x-auto hidden lg:block">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Hotel Image</th>
                <th>Hotel Name</th>
                <th>Price PerNight</th>
                <th>Date you pick</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((book) => (
                <BookingRow
                  key={book._id}
                  book={book}
                  handleCancel={handleCancel}
                  setReload={setReload}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-3  p-2">
          {booking.map((book) => (
            <BookingMobile
              key={book._id}
              book={book}
              handleCancel={handleCancel}
              setReload={setReload}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyBooking;
