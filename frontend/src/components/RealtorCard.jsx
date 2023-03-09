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
    <div class="rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 p-1 shadow-xl">
      <div className="w-[35rem] h-[30vh] bg-gray-100 flex items-center flex-row shadow-md rounded-md overflow-hidden rounded-2xl">
        <img
          src={`http://127.0.0.1:8000${profile_picture}`}
          alt=""
          className="w-full h-full border-4 object-cover rounded-xl"
        />
        <div className="w-full h-full p-2 flex flex-col justify-center">
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
          <div className="flex items-start flex-col gap-1 px-2 ">
            <h1 className="text-lg font-semibold text-gray-700">{name}</h1>
            <div className="w-1/5 rounded-full bg-gray-600 h-1"></div>
            <p className="text-sm text-gray-500 text-center">{description}</p>
          </div>
          <div className="w-full flex justify-center mt-8">
            <button
              onClick={handleClick}
              className="right-4 top-[8rem] bg-blue-500 mt-4 px-2 flex items-center gap-2 text-white py-1 rounded-full"
            >
              Message Now! <FaFacebookMessenger />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealtorCard;
