import React, { useState, useEffect, useLayoutEffect } from 'react';
import Hero from '../components/Hero';
import Feature from '../components/feature/Feature';
import Recommended from '../components/Recommended';
import { useContext } from 'react';

import QueryString from 'query-string';
import Axios from 'axios';
import Loading from '../layout/Loading';
import DispatchContext from '../context/DispatchContext';
import StateContext from '../context/StateContext';
import Timeline from '../components/Timeline';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Promo from '../components/Promo';
import { motion as m } from 'framer-motion';
import useGeoLocation from '../hooks/useGeolocation';

function Home() {
  const location = useGeoLocation();
  const GlobalDispatch = useContext(DispatchContext);
  const GlobalState = useContext(StateContext);
  const [allListings, setAllListings] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [closest, setClosest] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    const source = Axios.CancelToken.source();
    async function GetAllListings() {
      try {
        const listingResponse = await Axios.get(
          'http://127.0.0.1:8000/api/listings/',
          { cancelToken: source.token }
        );
        setDataLoading(false);
        setAllListings(listingResponse.data);
        GlobalDispatch({
          type: 'getListings',
          listingValue: listingResponse.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
    GetAllListings();

    return () => {
      source.cancel;
    };
  }, [location]);
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log(response.data);
        setUserInfo(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    GetProfileInfo();
  }, [location]);
  useEffect(() => {
    async function GetClosestProperty() {
      try {
        const response = await Axios.get(
          ` http://127.0.0.1:8000/api/users/recommended/${GlobalState.userId}/`
        );
        console.log(response.data);
        setClosest(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    GetClosestProperty();
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    // const query = new URLSearchParams(window.location.search);
    const values = QueryString.parse(location.search);
    console.log(values.success);
    if (values.success) {
      async function ChangeSubscription() {
        const subscribedStatus = new FormData();
        subscribedStatus.append('subscribed', values.success);
        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`,
            subscribedStatus
          );
          console.log(response);
          GlobalDispatch({ type: 'getSubscribedInfo' });
        } catch (error) {
          console.log(error);
        }
      }
      ChangeSubscription();
    }

    if (values.canceled) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  useEffect(() => {
    if (location.loaded && !location.error && GlobalState.userIsLogged) {
      async function AddLocation() {
        const formData = new FormData();
        formData.append('latitude', location.coordinates.lat),
          formData.append('longitude', location.coordinates.lng);

        try {
          const response = await Axios.patch(
            `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/update/`,
            formData
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
      AddLocation();
    }
  }, [location]);
  if (dataLoading === true) {
    return <Loading />;
  }
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
    >
      <Hero />
      <Feature allListings={allListings} />
      <Recommended
        allListings={allListings}
        userInfo={userInfo}
        closest={closest}
      />
      <Timeline />
      <Banner />
      <Promo />
      <Footer />
    </m.div>
  );
}

export default Home;
