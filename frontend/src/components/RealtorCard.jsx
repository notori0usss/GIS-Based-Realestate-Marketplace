import React from 'react';
import { FaFacebookMessenger, FaMailBulk } from 'react-icons/fa';

function RealtorCard({
  name,
  profile_picture,
  phone,
  description,
  email,
  forclosure_agent,
  listing_agent,
  buyers_agent,
  relocation_agent,
}) {
  const handleClick = () => {
    const recipient = email;
    const subject = 'Regarding your real estate services';
    const emailBody =
      'Hi, I am interested in your real estate services. Please let me know how we can take this forward.\n Regards,\n ';

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${emailBody}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="w-72 bg-gray-100 flex items-center flex-col shadow-md rounded-md">
      <div
        className="bg-blue-500 w-full h-32 relative"
        style={{ clipPath: ' polygon(0 0, 100% 0, 100% 80%, 0 70%)' }}
      ></div>
      <img
        src={`http://127.0.0.1:8000${profile_picture}`}
        alt=""
        className="w-32 h-32 rounded-full border-4 object-cover absolute mt-10"
      />
      <div className="mt-12 flex items-center flex-col gap-1 px-2 ">
        <h1 className="text-lg font-semibold text-gray-700">{name}</h1>
        <div className="w-1/5 rounded-full bg-gray-600 h-1"></div>
        <p className="text-sm text-gray-500 mt-5 text-center">{description}</p>
        <div className="flex gap-2">
          {forclosure_agent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
              Forclosure
            </span>
          )}
          {listing_agent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
              Listing
            </span>
          )}{' '}
          {buyers_agent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
              Buyers
            </span>
          )}{' '}
          {relocation_agent && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-xs font-semibold text-pink-600">
              Relocation
            </span>
          )}
        </div>
      </div>
      <button
        onClick={handleClick}
        className="right-4 top-[8rem] bg-blue-500 mt-4 px-2 flex items-center gap-2 text-white py-1 rounded-full"
      >
        Message Now! <FaFacebookMessenger />
      </button>
      <div
        className="h-10 bg-blue-500 w-full"
        style={{ clipPath: 'polygon(0 30%, 100% 10%, 100% 100%, 0 100%)' }}
      ></div>
    </div>
  );
}

export default RealtorCard;
