import React, { useContext, useEffect, useState } from "react"
import { IoSend } from "react-icons/all"
import { useNavigate, useParams } from "react-router-dom"
import Axios from "axios"
import timeSince from "../helpers/timesince"
import StateContext from "../context/StateContext"

function Comments({ listingInfo, onCommentSubmit, deleteComment }) {
  const navigate = useNavigate()
  const GlobalState = useContext(StateContext)

  const [comments, setComments] = useState(listingInfo.comments)
  const [singleComment, setSingleComment] = useState([])
  const params = useParams()
  function formSubmitHandler(e) {}

  return (
    <div className="container max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold">Comments</h1>
      {GlobalState.userIsLogged && (
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault()
            onCommentSubmit(singleComment)
            setSingleComment("")
          }}
        >
          <div className="flex items-center my-5">
            <img
              className="w-10 h-10 object-cover rounded-full mx-3"
              src={GlobalState.userProfilePicture}
              alt=""
            />
            <input
              className="w-2/3 h-9 bg-gray-300 py-5 px-2 rounded-l-2xl border border-gray-300 outline-gray-400"
              type="text"
              value={singleComment}
              placeholder="Write a comment..."
              onChange={(e) => setSingleComment(e.target.value)}
            />

            <button
              className="font-semibold bg-blue-500 py-[9px] px-4 text-white rounded-r-2xl"
              type="submit"
            >
              <IoSend className="text-2xl" />
            </button>
          </div>
        </form>
      )}
      <div>
        {listingInfo.comments.map((comment, index) => (
          <div key={index} className="flex gap-2 my-3">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={comment.profilePicture}
              alt=""
            />
            <div className="flex flex-col">
              <div className="flex flex-col bg-gray-300 rounded-lg px-4 py-2">
                <p
                  className="font-semibold hover:underline cursor-pointer"
                  onClick={() => navigate(`/agencies/${comment.userId}`)}
                >
                  {comment.userName}
                </p>
                <p>{comment.commentText}</p>
              </div>
              <div className="flex gap-3 items-center px-2">
                <button
                  className="text-sm font-semibold"
                  onClick={(e) => {
                    e.preventDefault()
                    deleteComment(index)
                  }}
                >
                  Delete
                </button>
                <p className="text-xs">{timeSince(comment.time_posted)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Comments
