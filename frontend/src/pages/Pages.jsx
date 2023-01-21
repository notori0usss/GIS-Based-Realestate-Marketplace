import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import Listings from "./Listings"
import AddProperty from "./AddProperty"
import Login from "./Login"

function Pages() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/addProperty" element={<AddProperty />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Pages
