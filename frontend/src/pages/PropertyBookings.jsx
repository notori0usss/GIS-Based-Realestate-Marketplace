import React, { useContext, useState, useEffect } from 'react';
import StateContext from '../context/StateContext';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import dateFormat from '../helpers/date';
import RatingStar from '../components/RatingStar';
import { FaTrash } from 'react-icons/fa';
import BookingImg from '../assets/booking2.jpg';

function PropertyBookings() {
  const GlobalState = useContext(StateContext);
  const [req, setReq] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        setData(response.data.my_listings_bookings);
      } catch (e) {
        console.log(e);
      }
    }
    GetProfileInfo();
  }, [req]);
  console.log(data);
  function bookedDate(datee) {
    return new Date(datee);
  }
  function currentDate() {
    return new Date();
  }
  function onClickHander(value, id) {
    const rating = 0;
    setReq(req + 1);
    async function UpdateBooking() {
      const formData = new FormData();
      formData.append('status', value);
      try {
        const response = await Axios.patch(
          `http://127.0.0.1:8000/api/bookings/${id}/update/`,
          formData
        );
        console.log(response);
      } catch (error) {
        console.log(error.response);
      }
    }
    UpdateBooking();
  }
  async function deleteHandler(id) {
    try {
      const response = await Axios.delete(
        `http://127.0.0.1:8000/api/bookings/${id}/delete/`
      );
      setReq(req + 1);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="max-w-7xl container mx-auto flex flex-col items-center justify-center py-10">
      <img
        src={BookingImg}
        alt=""
        className="w-full h-[25vh] object-cover rounded-xl shadow"
      />
      <h2 className="text-3xl text-gray-700 font-bold my-10">
        Your Property Bookings
      </h2>
      {data.length === 0 ? (
        <div className="h-fit w-fit">
          <img
            className="w-full h-full"
            src="https://th.bing.com/th/id/OIP.VqqBt3f-4Udxi1wp6IpLKgHaEo?pid=ImgDet&rs=1"
            alt=""
          />
        </div>
      ) : (
        ''
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <div className="bg-blue-100 rounded-xl flex flex-col gap-5 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000${item.listing.picture1}`}
              alt=""
              className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={() => navigate(`/listings/${item.listing.id}`)}
            />
            <div className="flex justify-between pr-2 items-center">
              <div className="px-5">
                <h2 className="text-xl font-bold text-gray-700">
                  {item.listing.title}
                </h2>
                <p>Booking On: {dateFormat(item.date_booked)}</p>
              </div>
              <button
                onClick={() => deleteHandler(item.id)}
                className="text-red-500 text-xl"
              >
                <FaTrash className="cursor-pointer hover:text-red-600" />
              </button>
            </div>

            <div className="flex justify-between items-center gap-4 px-5 py-2">
              <div
                className={`bg-${
                  item.status === 'Pending'
                    ? 'yellow'
                    : item.status === 'Completed'
                    ? 'green'
                    : item.status === 'Rejected'
                    ? 'red'
                    : item.status === 'Approved'
                    ? 'blue'
                    : item.status === 'Cancelled'
                    ? 'red'
                    : ''
                }-500 px-2 py-1 rounded-3xl text-white text-sm`}
              >
                Status: {item.status}
              </div>
              <Link
                to={`/profile/${item.booker}`}
                className="font-semibold hover:underline"
              >
                {item.f_name} {item.l_name}
              </Link>
            </div>
            {item.status === 'Pending' && (
              <div className="w-full flex items-center justify-center pb-2">
                <button
                  onClick={() => onClickHander('Approved', item.id)}
                  className="px-5 py-1 bg-blue-500 text-white font-semibold mr-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => onClickHander('Rejected', item.id)}
                  className="px-5 py-1 bg-red-500 text-white font-semibold mr-2 rounded"
                >
                  Decline
                </button>
              </div>
            )}
            {item.status === 'Approved' && (
              <div className="w-full flex items-center justify-center pb-2">
                {bookedDate(item.date_booked) < currentDate() ? (
                  <button
                    onClick={() => onClickHander('Completed', item.id)}
                    className="px-5 py-1 bg-green-500 text-white font-semibold mr-2 rounded"
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-5 py-1 bg-green-400 text-gray-200 font-semibold mr-2 rounded cursor-not-allowed"
                  >
                    Completed
                  </button>
                )}

                <button
                  onClick={() => onClickHander('Cancelled', item.id)}
                  className="px-5 py-1 bg-red-500 text-white font-semibold mr-2 rounded"
                >
                  Cancelled
                </button>
              </div>
            )}
            <hr />
            <div className="">
              {item.status === 'Completed' &&
                (item.rating !== null ? (
                  <div className="flex items-center justify-center gap-5">
                    <span className="text-lg font-semibold text-gray-600">
                      Rating:
                    </span>
                    <RatingStar rating={item.rating} />
                  </div>
                ) : (
                  <div className="w-full text-center text-lg font-semibold text-gray-500">
                    Rating: User Hasn't Rated
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertyBookings;
