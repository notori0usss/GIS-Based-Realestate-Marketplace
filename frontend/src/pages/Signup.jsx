import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import LoginImg from "../assets/login/1.jpg"
import Axios from "axios"

import { useImmerReducer } from "use-immer"
function Signup() {
  const [sendRequest, setSendRequest] = useState(false)
  const [usernameValue, setUsernameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [re_passwordValue, setRePasswordValue] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form Submitted")
    setSendRequest(!sendRequest)
  }

  useEffect(() => {
    if (sendRequest) {
      const source = Axios.CancelToken.source()
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/users/",
            {
              username: usernameValue,
              email: emailValue,
              password: passwordValue,
              re_password: re_passwordValue,
            },
            {
              cancelToken: source.token,
            }
          )
          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      SignUp()
      return () => {
        source.cancel
      }
    }
  }, [sendRequest])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full h-screen justify-center space-y-10 bg-gradient-to-b from-gray-700 md:from-gray-700 px-28 text-white">
        <h1 className="text-3xl font-pacifico">Create Account</h1>
        <p>
          Already have an account yet?
          <Link
            to="/login"
            className="text-yellow-500 hover:text-yellow-300 hover:underline ml-1"
          >
            Login
          </Link>
        </p>

        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full items-center justify-center gap-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="name@email.com"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={re_passwordValue}
            onChange={(e) => setRePasswordValue(e.target.value)}
          />

          <button
            className="px-3 py-3 bg-yellow-500 w-2/3 rounded-lg mt-5"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
      <img
        src={LoginImg}
        alt="house"
        className="w-full h-screen object-cover hidden lg:block"
      />
    </div>
  )
}

export default Signup
