import React, { useContext, useState, useEffect } from 'react';

import Rating from '../components/Rating';
import { IoSend } from 'react-icons/io5';
import dateFormat from '../helpers/date';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
function MyBookingCard({ id, listing, date_booked, status, rating, setReq }) {
  const ratingArr = new Array(rating).fill(Math.random());
  const [ratings, setRatings] = useState(null);
  const handleRatingChange = (value) => {
    setRatings(value);
  };
  console.log(ratings);
  const handleSubmit = (e, id) => {
    e.preventDefault();
    // Submit the review with the rating
    async function UpdateBooking() {
      console.log(ratings);
      const formData = new FormData();
      formData.append('status', 'Completed'),
        formData.append('rating', ratings);

      try {
        const response = await Axios.patch(
          `http://127.0.0.1:8000/api/bookings/${id}/update/`,
          formData
        );
        console.log(response);
        setReq(response);
      } catch (error) {
        console.log(error);
      }
    }
    UpdateBooking();
  };
  return (
    <div className="bg-blue-100 rounded-xl flex flex-col gap-3 overflow-hidden pb-2 relative">
      <img
        src={`http://127.0.0.1:8000${listing.picture1}`}
        alt=""
        className="w-full h-40 object-cover cursor-pointer hover:scale-105 transition-all duration-200"
        onClick={() => navigate(`/listings/${listing.id}`)}
      />
      <div className="flex flex-col gap-2 justify-center">
        <div className="px-5">
          <h2 className="text-xl font-bold text-gray-700">{listing.title}</h2>
          <p>Booking On: {dateFormat(date_booked)}</p>
        </div>

        <div className="flex justify-between items-center gap-4 px-5 py-2">
          <div
            className={`bg-${
              status === 'Pending'
                ? 'yellow'
                : status === 'Completed'
                ? 'green'
                : status === 'Rejected'
                ? 'red'
                : status === 'Approved'
                ? 'blue'
                : status === 'Cancelled'
                ? 'red'
                : ''
            }-500 px-2 py-1 rounded-3xl text-white text-sm`}
          >
            Status: {status}
          </div>
          <button className="font-semibold hover:underline">
            {listing.seller_agency_name}
          </button>
        </div>
        {status === 'Completed' && rating === null && (
          <form
            onSubmit={(e) => handleSubmit(e, id)}
            className="flex items-center justify-center p-2"
          >
            <Rating onChange={handleRatingChange} />
            {ratings && (
              <button
                type="submit"
                className="text-xl ml-2 text-blue-500 flex items-center justify-center"
              >
                <IoSend />
              </button>
            )}
          </form>
        )}
        {status === 'Completed' && rating !== null && (
          <div className="flex gap-4 items-center mx-auto text-lg font-semibold">
            Rated:{' '}
            {ratingArr.map((item) => (
              <FaStar className="text-yellow-500 text-2xl" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookingCard;
