import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginImg from "../assets/login/1.jpg"
import { useImmerReducer } from "use-immer"
import { useEffect } from "react"
import Axios from "axios"
import DispatchContext from "../context/DispatchContext"
import StateContext from "../context/StateContext"

function Login() {
  const initialState = {
    usernameValue: "",
    passwordValue: "",
    sendRequest: 0,
    token: "",
  }

  const navigate = useNavigate()
  const GlobalDispatch = useContext(DispatchContext)
  const GlobalState = useContext(StateContext)

  function ReducerFunction(draft, action) {
    switch (action.type) {
      case "catchUsernameChange":
        draft.usernameValue = action.usernameChosen
        break
      case "catchPasswordChange":
        draft.passwordValue = action.passwordChosen
        break
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1
        break
      case "catchToken":
        draft.token = action.tokenValue
    }
  }

  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch({ type: "changeSendRequest" })
  }
  useEffect(() => {
    if (state.sendRequest) {
      const source = Axios.CancelToken.source()
      async function SignIn() {
        try {
          const response = await Axios.post(
            "http://127.0.0.1:8000/api-auth-djoser/token/login/",
            {
              username: state.usernameValue,
              password: state.passwordValue,
            },
            {
              cancelToken: source.token,
            }
          )
          // console.log(response)
          dispatch({
            type: "catchToken",
            tokenValue: response.data.auth_token,
          })
          GlobalDispatch({
            type: "GetTokenResponse",
            tokenValue: response.data.auth_token,
          })
        } catch (error) {
          console.log(error)
        }
      }
      SignIn()

      return () => {
        source.cancel
      }
    }
  }, [state.sendRequest])
  //get user info
  useEffect(() => {
    if (state.token !== "") {
      const source = Axios.CancelToken.source()
      async function GetUserInfo() {
        try {
          const response = await Axios.get(
            "http://127.0.0.1:8000/api-auth-djoser/users/me/",
            {
              headers: { Authorization: "Token ".concat(state.token) },
            },
            {
              cancelToken: source.token,
            }
          )
          GlobalDispatch({
            type: "userSignsIn",
            usernameInfo: response.data.username,
            emailInfo: response.data.email,
            idInfo: response.data.id,
          })
          if (response.status === 200) {
            navigate("/")
          }

          console.log(response)
        } catch (error) {
          console.log(error)
        }
      }
      GetUserInfo()
      return () => {
        source.cancel()
      }
    }
  }, [state.token])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center w-full h-screen justify-center space-y-10 bg-gray-700 px-28 text-white">
        <h1 className="text-3xl font-pacifico">
          Log into Digi<span className="text-yellow-500">Dalal</span>
        </h1>
        <p>
          Don't have an account yet?
          <Link
            to="/signup"
            className="text-yellow-500 hover:text-yellow-300 hover:underline ml-1"
          >
            Sign up Free
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
            onChange={(e) => {
              dispatch({
                type: "catchUsernameChange",
                usernameChosen: e.target.value,
              })
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-3 py-3 w-2/3 rounded-lg text-black"
            value={state.passwordValue}
            onChange={(e) => {
              dispatch({
                type: "catchPasswordChange",
                passwordChosen: e.target.value,
              })
            }}
          />
          <Link to="/forgotpasswords" className="text-gray-300">
            Forgot Password
          </Link>

          <button className="px-3 py-3 bg-yellow-500 w-2/3 rounded-lg mt-2">
            Login
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

export default Login
