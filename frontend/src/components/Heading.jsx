import React from "react"

function Heading({ title, subtitle }) {
  return (
    <>
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-2 mb-10 text-gray-500">{subtitle}</p>
    </>
  )
}

export default Heading
