import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useImmerReducer } from 'use-immer';
import StateContext from '../context/StateContext';
import DispatchContext from '../context/DispatchContext';
import UserProfile from '../components/UserProfile';
import UserIcon from '../assets/user.png';
import Loading from '../layout/Loading';
import AgencyCard from '../layout/AgencyCard';
import ProfileListCard from '../components/ProfileListCard';
function Profile() {
  const GlobalState = useContext(StateContext);
  const GlobalDispatch = useContext(DispatchContext);
  const navigate = useNavigate();
  const initialState = {
    userProfile: {},
    agencyNameValue: '',
    phoneNumberValue: '',
    bioValue: '',
    uploadedPictureValue: [],
    profilePictureValue: 'http://127.0.0.1:8000/media/user.png',
    sendRequest: 0,
    dataIsLoading: true,
  };
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        // console.log(response.data)
        dispatch({ type: 'loadingDone' });
        dispatch({
          type: 'catchuserProfileInfo',
          profileObject: response.data,
        });
      } catch (e) {
        console.log(e);
      }
    }
    GetProfileInfo();
  }, []);

  //form submit
  // console.log(state.userProfile);
  if (state.dataIsLoading === true) {
    return <Loading />;
  }

  return (
    <>
      {state.userProfile.agency_name === null ||
      state.userProfile.phone_number === null ? (
        <UserProfile
          agency="Update Profile"
          number="Update Profile"
          profilePicture={state.profilePictureValue}
          isSubscribed={state.userProfile.subscribed}
          totalListing={state.userProfile.seller_listings_count}
          sellerId={state.userProfile.seller}
        />
      ) : (
        <UserProfile
          agency={state.userProfile.agency_name}
          number={state.userProfile.phone_number}
          profilePicture={state.userProfile.profile_picture}
          isSubscribed={state.userProfile.subscribed}
          totalListing={state.userProfile.seller_listings_count}
          sellerId={state.userProfile.seller}
        />
      )}
      <hr />
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-8 my-4 mx-auto">
          {state.userProfile.seller_listings?.map((item) => (
            <ProfileListCard {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
