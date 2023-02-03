import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Listings from "./Listings"
import AddProperty from "./AddProperty"
import Login from "./Login"
import Signup from "./Signup"
import Navbar from "../layout/Navbar"
import CheckOut from "./CheckOut"
import Profile from "./Profile"
import Realtor from "./Realtor"
import AllProperties from "../components/AllProperties"
import AdminPage from "./AdminPage"
function Pages() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/addProperty" element={<AddProperty />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/realtors" element={<Realtor />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/allProperties" element={<AllProperties />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Pages
