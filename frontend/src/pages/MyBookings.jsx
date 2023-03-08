import React, { useContext, useState, useEffect } from 'react';
import StateContext from '../context/StateContext';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dateFormat from '../helpers/date';
import Loading from '../layout/Loading';
function MyBookings() {
  const GlobalState = useContext(StateContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        setData(response.data.my_bookings);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    GetProfileInfo();
  }, []);
  console.log(data);
  if (loading === true) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl container mx-auto flex flex-col items-center justify-center">
      <h2 className="text-3xl text-gray-700 font-bold my-10">Your Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <div className="bg-blue-100 rounded-xl flex flex-col gap-5 overflow-hidden">
            <img
              src={`http://127.0.0.1:8000${item.listing.picture1}`}
              alt=""
              className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition-all duration-200"
              onClick={() => navigate(`/listings/${item.listing.id}`)}
            />
            <div className="px-5">
              <h2 className="text-xl font-bold text-gray-700">
                {item.listing.title}
              </h2>
              <p>Booking On: {dateFormat(item.date_booked)}</p>
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
                    : ''
                }-500 px-2 py-1 rounded-3xl text-white text-sm`}
              >
                Status: {item.status}
              </div>
              <button className="font-semibold hover:underline">
                {item.listing.seller_agency_name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
