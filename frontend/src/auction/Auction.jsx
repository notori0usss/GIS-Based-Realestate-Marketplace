import React from "react"
import { useContext } from "react"
import { useState } from "react"
import { useRef } from "react"
import { AuthContext } from "./context/AuthContext"

export default function Auction() {
  const [showModal, setShowModal] = React.useState(false)
  const [error, setError] = useState(true)
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, currentUser } = useContext(AuthContext)

  const onFormSubmit = async (e) => {
    e.preventDefault()

    if (emailRef.current.value && passwordRef.current.value === "") {
      return setError(true)
    } else {
      setShowModal(false)
      setError(false)
    }
    try {
      await login(emailRef.current.value, passwordRef.current.value)
    } catch (error) {
      setError("Invalid Login")
    }
  }

  return (
    <>
      <button
        className="bg-yellow-500 text-white active:bg-yellow-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {currentUser ? currentUser.name : "mula"}
      </button>
      {showModal ? (
        <>
          <form onSubmit={onFormSubmit}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Enter Token</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  {error ? (
                    <div className="text-center bg-red-300 rounded-sm py-2 text-white">
                      Invalid Token
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="relative p-6 flex-auto">
                    <input
                      type="text"
                      className={`w-full px-3 py-3 border-2 ${
                        error ? "border-red-400" : "border-green-400"
                      }`}
                      required
                      ref={emailRef}
                    />
                    <input
                      type="password"
                      className={`w-full px-3 py-3 border-2 ${
                        error ? "border-red-400" : "border-green-400"
                      }`}
                      required
                      ref={passwordRef}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}
