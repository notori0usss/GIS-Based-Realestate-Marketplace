import React from "react"

function Button({ title }) {
  return (
    <button className="overflow-hidden bg-teal-400 px-4 py-2 rounded-md">
      {title}
    </button>
  )
}

export default Button
