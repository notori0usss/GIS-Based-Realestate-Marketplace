import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import StateContext from '../context/StateContext';
import Loading from '../layout/Loading';

function Chat() {
  const receiver = useParams().id;
  const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  const [allMessage, setAllMessage] = useState(null);
  const GlobalState = useContext(StateContext);
  const [selectedConvo, setSelectedConvo] = useState('');
  const userId = GlobalState.userId; // assuming this is defined somewhere
  const [allChatters, setAllChatters] = useState([]);
  const [fakeId, setFakeId] = useState(null);
  const [loading, setLoading] = useState(true);
  let socket = new WebSocket(`ws://127.0.0.1:8000/ws/users/${userId}/chat/`);

  let typingTimer = 0;
  let isTypingSignalSent = false;

  useEffect(() => {
    async function GetAllChatters() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/chats/`
        );
        // console.log(response.data);
        setAllChatters(response.data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
    GetAllChatters();
  }, [GlobalState.userId]);
  useEffect(() => {
    async function GetFakeId() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/profiles/${GlobalState.userId}/`
        );
        // console.log(response.data);
        setFakeId(response.data.id);
      } catch (e) {
        console.log(e);
      }
    }
    GetFakeId();
  }, [GlobalState.userId]);
  console.log(fakeId);
  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if (message) {
      console.log(socket.readyState);
      // const reciever = selectedConvo.member.filter((el) => el.seller != userId);
      socket.send(
        JSON.stringify({
          action: 'message',
          message,
          user: fakeId,
          roomId: selectedConvo,
        })
      );
    }
    setMessage('');
  };
  // users ko sabai chat
  // http://127.0.0.1:8000/api/users/8/chats/?format=json
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const chatId = selectedConvo;
    const userId = fakeId;
    if (chatId === data.roomId) {
      if (data.action === 'message') {
        // data['userImage'] = ServerUrl.BASE_URL.slice(0, -1) + data.userImage;
        setAllMessage((prevState) => {
          let messagesState = JSON.parse(JSON.stringify(prevState));
          messagesState.results.unshift(data);
          return messagesState;
        });
      }
    }
  };
  if (loading) {
    return <Loading />;
  }
  function conversationSelector(info) {
    async function GetAllMessage() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/chats/${info.roomId}/messages/`
        );
        console.log(response.data);
        setAllMessage(response.data);
        setSelectedConvo(info.roomId);
      } catch (e) {
        console.log(e);
      }
    }
    GetAllMessage();
  }

  return (
    <div className="px-2 shadow-lg rounded-lg w-full h-screen">
      <div className="flex flex-row justify-between bg-white">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          <div className="border-b-2 py-4 px-2">
            <input
              type="text"
              placeholder="search chatting"
              className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
            />
          </div>

          {allChatters.map((item) => (
            <div
              className="flex flex-row py-4 px-2 justify-center items-center border-b-2"
              onClick={() => conversationSelector(item)}
            >
              {item.member
                .filter((el) => el.seller != userId)
                .map((el2) => (
                  <>
                    <div className="w-1/4">
                      <img
                        src={el2.profile_picture}
                        className="object-cover h-12 w-12 rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="w-full">
                      <div className="text-lg font-semibold">{el2.f_name}</div>
                      <span className="text-gray-500">Muji</span>
                    </div>
                  </>
                ))}
            </div>
          ))}
        </div>
        <div className="w-full px-5 flex flex-col justify-between h-[90vh]">
          <div className="flex flex-col mt-5">
            {/* sender */}
            {allMessage &&
              allMessage.map((item) =>
                item.profile_id == userId ? (
                  <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      {item.message}
                    </div>
                    <img
                      src={`http://127.0.0.1:8000${item.userImage}`}
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex justify-start mb-4">
                    <img
                      src={`http://127.0.0.1:8000${item.userImage}`}
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                      {item.message}
                    </div>
                  </div>
                )
              )}

            {/* reciver  */}
          </div>
          <form className="py-5" onSubmit={messageSubmitHandler}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
