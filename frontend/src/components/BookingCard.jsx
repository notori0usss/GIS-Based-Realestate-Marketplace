import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
function BookingCard({
  f_name,
  l_name,
  booker,
  booker_profile_picture,
  id,
  getStatus,
}) {
  function onClickHander(value) {
    getStatus(value);
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
        console.log(error.response.data);
      }
    }
    UpdateBooking();
  }

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center gap-2 bg-white my-2 border-2 py-4">
      <img
        className="w-16 h-16 rounded-lg object-cover"
        src={`http://127.0.0.1:8000${booker_profile_picture}`}
        alt=""
      />

      <div className="space-y-3">
        <div>
          <button
            onClick={() => navigate(`/profile/${booker}`)}
            className="font-semibold text-lg hover:underline cursor-pointer"
          >
            {f_name} {l_name}
          </button>
        </div>
        <button
          onClick={() => onClickHander('Approved')}
          className="px-4 py-1 bg-blue-500 text-white font-semibold mr-2"
        >
          Approve
        </button>
        <button
          onClick={() => onClickHander('Rejected')}
          className="px-4 py-1 bg-red-500 text-white font-semibold mr-2"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default BookingCard;
