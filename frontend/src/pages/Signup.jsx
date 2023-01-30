import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import LoginImg from "../assets/login/1.jpg"
import Axios from "axios"

import { useImmerReducer } from "use-immer"

function Signup() {
  const navigate = useNavigate()
  const initialState = {
    usernameValue: "",
    emailValue: "",
    passwordValue: "",
    rePasswordValue: "",
    sendRequest: 0,
  }

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen
        break
      case "catchEmailChange":
        draft.emailValue = action.emailChosen
        break
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen
        break
      case "catchRePasswordChange":
        draft.rePasswordValue = action.rePasswordChosen
        break
      case "changeSubmitRequest":
        draft.sendRequest = draft.sendRequest + 1
        break
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  const submitHandler = (e) => {
    e.preventDefault()
    console.log("Form Submitted")
    console.log(state)
    dispatch({ type: "changeSubmitRequest" })
  }

  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source()
      async function SignUp() {
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/users/",
            {
              username: state.usernameValue,
              email: state.emailValue,
              password: state.passwordValue,
              re_password: state.rePasswordValue,
            },
            {
              cancelToken: source.token,
            }
          )
          console.log(response)
          if (response.status === 201) {
            navigate("/login")
          }
        } catch (error) {
          console.log(error)
        }
      }
      SignUp()
      return () => {
        source.cancel
      }
    }
  }, [state.sendRequest])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full h-screen justify-center space-y-10 bg-gray-700 px-28 text-white">
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
            value={state.usernameValue}
            onChange={(e) =>
              dispatch({
                type: "catchUsernameChange",
                usernameChosen: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="name@email.com"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={state.emailValue}
            onChange={(e) =>
              dispatch({
                type: "catchEmailChange",
                emailChosen: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={state.passwordValue}
            onChange={(e) =>
              dispatch({
                type: "catchPasswordChange",
                passwordChosen: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={state.rePasswordValue}
            onChange={(e) =>
              dispatch({
                type: "catchRePasswordChange",
                rePasswordChosen: e.target.value,
              })
            }
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
