import React, { useState, useEffect } from "react"

export default function CheckOut() {
  return (
    <section>
      <div className="product">
        <img
          src="https://i.scdn.co/image/ab67616d0000b27378c8fe2c8e809ef6ce49bd3b"
          alt="The cover of Stubborn Attachments"
        />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>
      <form
        action="http://127.0.0.1:8000/api/stripe/create-checkout-session"
        method="POST"
      >
        <button type="submit">Checkout</button>
      </form>
    </section>
  )
}
