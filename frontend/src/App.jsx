import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Listings from "./pages/Listings"
import Auction from "./pages/Auction"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
