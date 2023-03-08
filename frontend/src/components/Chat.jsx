import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import StateContext from '../context/StateContext';

function Chat() {
  const receiver = useParams().id;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const GlobalState = useContext(StateContext);
  const userId = GlobalState.userId; // assuming this is defined somewhere
  // console.log(message, messages, userId, receiver);
  const [allChatters, setAllChatters] = useState([]);
  const allMembers = allChatters
    .map((item) => item.member.find((item) => item.seller !== userId))
    .filter((item) => item !== undefined);
  console.log(allMembers);
  // console.log(allMembers.find((el) => console.log(el)));
  useEffect(() => {
    async function GetAllChatters() {
      try {
        const response = await Axios.get(
          `http://127.0.0.1:8000/api/users/${userId}/chats/`
        );
        // console.log(response.data);
        setAllChatters(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    GetAllChatters();
  }, [GlobalState.userId, receiver]);
  function sendMessage(e) {
    e.preventDefault();

    // add the message to the state
    setMessages([...messages, { sender: userId, message }]);
    setMessage('');
  }
  // users ko sabai chat
  // http://127.0.0.1:8000/api/users/8/chats/?format=json
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

          <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
            <div className="w-1/4">
              <img
                src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                className="object-cover h-12 w-12 rounded-full"
                alt=""
              />
            </div>
            {/* {allChatters.member
              .filter((el) => el.seller !== userId)
              .map((item) => (
                <div className="w-full">
                  <div className="text-lg font-semibold">{item.f_name}</div>
                  <span className="text-gray-500">Muji</span>
                </div>
              ))} */}
          </div>
        </div>
        <div className="w-full px-5 flex flex-col justify-between h-[90vh]">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                K cha muji Haru
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            <div className="flex justify-start mb-4">
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                at praesentium, aut ullam delectus odio error sit rem.
                Architecto nulla doloribus laborum illo rem enim dolor odio
                saepe, consequatur quas?
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <div>
                <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Magnam, repudiandae.
                </div>

                <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Debitis, reiciendis!
                </div>
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            <div className="flex justify-start mb-4">
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
              <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
                Chiku
              </div>
            </div>
          </div>
          <div className="py-5">
            <input
              className="w-full bg-gray-300 py-5 px-3 rounded-xl"
              type="text"
              placeholder="type your message here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
