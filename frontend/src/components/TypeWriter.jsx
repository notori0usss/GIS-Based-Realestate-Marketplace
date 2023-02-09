import React from "react"
import { useTypewriter, Cursor } from "react-simple-typewriter"
function TypeWriter() {
  const [text] = useTypewriter({
    words: ["Buy", "Sell", "Rent", "Find"],
    loop: 10,
  })

  return (
    <div className="App flex gap-2 ">
      <span className="text-blue-500 z-10">{text}</span>
      <Cursor cursorColor="#0081C9" />
      Your Next Property
    </div>
  )
}

export default TypeWriter
