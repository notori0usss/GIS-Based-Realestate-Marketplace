import React, { useContext, useEffect, useState } from 'react';
import Heading from '../components/Heading';
import RealtorCard from '../components/RealtorCard';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StateContext from '../context/StateContext';
import RealtorImg from '../assets/realtor.jpg';
function Realtor() {
  const [realtors, setRealtors] = useState([]);
  const GlobalState = useContext(StateContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function GetRealtor() {
      try {
        const response = await Axios.get(
          'http://127.0.0.1:8000/api/realtors/verified'
        );
        console.log(response.data);
        setRealtors(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    GetRealtor();
  }, [GlobalState.userIsLogged]);
  return (
    <>
      {/* <img
        src={RealtorImg}
        alt=""
        className="w-full h-[20vh] object-cover rounded-xl shadow mt-4 w-2/3 mx-auto"
      /> */}
      {GlobalState.userEmail === 'admin@digidalal.com' ||
      GlobalState.userEmail === 'dhunganaswaroop@gmail.com' ? (
        <button
          className="bg-red-500 px-2 py-2 text-white rounded absolute right-3 mt-5"
          onClick={() => navigate('/realtortable')}
        >
          Manage All Realtors
        </button>
      ) : (
        ''
      )}

      <div className="flex items-center justify-center flex-col mt-10">
        <Heading
          title={'Our Best Realtors'}
          subtitle={'Hire with Just one Text'}
        />
        <div className="flex gap-10 flex-wrap max-w-7xl container items-center justify-center mb-10">
          {realtors?.map((item) => (
            <RealtorCard key={item.id} {...item} />
          ))}
        </div>
        <hr />
        {!GlobalState.isSubscribed && GlobalState.userIsLogged && (
          <div className="mt-10 bg-blue-200 text-center py-2 px-5 rounded-full">
            Are you a realtor?
            <br />
            {GlobalState.userObject.f_name !== null &&
            GlobalState.userObject.l_name !== null &&
            GlobalState.userObject.phone_number !== null ? (
              <button
                onClick={() => navigate('/realtorform')}
                className="font-semibold text-gray-700"
              >
                Apply Here!
              </button>
            ) : (
              <button
                onClick={() => navigate(`/profileupdate/${GlobalState.userId}`)}
                className="font-semibold text-gray-700"
              >
                Update Profile
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Realtor;
