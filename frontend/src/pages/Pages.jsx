import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Listings from './Listings';
import AddProperty from './AddProperty';
import Login from './Login';
import Signup from './Signup';
import Navbar from '../layout/Navbar';
import CheckOut from './CheckOut';
import Profile from './Profile';
import Realtor from './Realtor';
import AllProperties from '../components/AllProperties';
import AdminPage from './AdminPage';
import ProfileUpdate from '../components/ProfileUpdate';
import Agencies from './Agencies';
import AgencyDetail from '../components/AgencyDetail';
import ListingDetails from './ListingDetails';
import Comparision from './Comparision';
import LikedItems from '../components/LikedItems';
import Promotion from '../layout/Promotion';
import MyBookings from './MyBookings';
import ProfilePage from '../components/ProfilePage';
import PropertyBookings from './PropertyBookings';
import RealtorForm from '../components/RealtorForm';
import RealtorTable from './RealtorTable';
import Chat from '../components/Chat';
function Pages() {
  return (
    <>
      <BrowserRouter>
        {/* <Promotion /> */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/agencies" element={<Agencies />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/realtors" element={<Realtor />} />
          <Route path="/realtorform" element={<RealtorForm />} />
          <Route path="/realtortable" element={<RealtorTable />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/allProperties" element={<AllProperties />} />
          <Route path="/profileupdate/:id" element={<ProfileUpdate />} />
          <Route path="/agencies/:id" element={<AgencyDetail />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/chat/:id" element={<Chat />} />

          <Route path="/listings/:id" element={<ListingDetails />} />
          <Route path="/compare/:id" element={<Comparision />} />
          <Route path="/likeditems" element={<LikedItems />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/propertybookings" element={<PropertyBookings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Pages;
