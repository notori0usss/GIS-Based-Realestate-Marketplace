import React, { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../layout/Loading';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile';
import {
  BsFillGrid3X3GapFill,
  FaFacebook,
  FaTiktok,
  FaYoutube,
} from 'react-icons/all';
import { MdVerified } from 'react-icons/md';
import ProfileListCard from './ProfileListCard';
function AgencyDetail() {
  const params = useParams();
  const initialState = {
    userProfile: {},
    dataIsLoading: true,
  };
  function ReducerFunction(draft, action) {
    switch (action.type) {
      case 'catchuserProfileInfo':
        draft.userProfile = action.profileObject;
        break;
      case 'loadingDone':
        draft.dataIsLoading = false;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  useEffect(() => {
    async function GetAgencyInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${params.id}/`
        );
        console.log(response.data);
        dispatch({ type: 'loadingDone' });
        dispatch({
          type: 'catchuserProfileInfo',
          profileObject: response.data,
        });
      } catch (e) {
        console.log(e);
      }
    }
    GetAgencyInfo();
  }, []);

  //form submit

  if (state.dataIsLoading === true) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="w-1/3 flex flex-col items-start">
          <div className="flex justify-center items-center py-6 gap-10">
            <img
              src={state.userProfile.profile_picture}
              alt="profile-picture"
              className="w-40 h-40 object-cover rounded-md"
            />
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold ">Total Listings</h1>
              <h1>{state.userProfile.seller_listings_count}</h1>
            </div>
            <div>
              <h1 className="text-xl font-semibold ">Contact</h1>
              <h2>{state.userProfile.phone_number}</h2>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-bold">
              {state.userProfile.agency_name}{' '}
              <MdVerified className="text-blue-500 text-md inline" />
            </h2>
            <p className="text-sm ">{state.userProfile.bio}</p>
          </div>
        </div>
        <hr className="w-1/2 h-[2px] mx-auto my-2 bg-gray-100 border-0 rounded md:my-3 dark:bg-gray-200"></hr>
        <div className="flex items-center gap-4">
          Find us on:
          <a
            className="bg-blue-900 text-white rounded-full flex items-center justify-center w-8 h-8 "
            href={`${state.userProfile.facebook_link}`}
            target="blank"
          >
            <FaFacebook className="text-xl" />
          </a>
          <a
            className="bg-red-600 text-white rounded-full flex items-center justify-center w-8 h-8 "
            href={`${state.userProfile.youtube_link}`}
            target="blank"
          >
            <FaYoutube className="text-xl" />
          </a>
          <a
            className="bg-black text-white rounded-full flex items-center justify-center w-8 h-8 "
            href={`${state.userProfile.tiktok_link}`}
            target="blank"
          >
            <FaTiktok className="text-xl" />
          </a>
        </div>
      </div>

      <hr className="w-1/2 h-[2px] mx-auto my-2 bg-gray-100 border-0 rounded md:my-3 dark:bg-gray-200"></hr>

      <div className="flex items-center w-full justify-center">
        <div className="grid grid-cols-3 gap-10">
          {state.userProfile.seller_listings.map((item) => (
            <ProfileListCard {...item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
}
export default AgencyDetail;
