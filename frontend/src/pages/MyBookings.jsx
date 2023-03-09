import React, { useContext, useState, useEffect } from 'react';
import StateContext from '../context/StateContext';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BookingImg from '../assets/booking.jpg';
import Loading from '../layout/Loading';
import MyBookingCard from '../components/MyBookingCard';
function MyBookings() {
  const GlobalState = useContext(StateContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [req, setReq] = useState(0);
  const getReq = (value) => {
    setReq(value);
  };
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
  }, [req]);

  console.log(data);
  if (loading === true) {
    return <Loading />;
  }
  return (
    <div className="max-w-7xl container mx-auto flex flex-col items-center justify-center py-10">
      <img
        src={BookingImg}
        alt=""
        className="w-full h-[30vh] object-cover rounded-xl shadow"
      />
      <h2 className="text-3xl text-gray-700 font-bold my-10">Your Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item, idx) => (
          <MyBookingCard key={idx} {...item} setReq={setReq} />
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
