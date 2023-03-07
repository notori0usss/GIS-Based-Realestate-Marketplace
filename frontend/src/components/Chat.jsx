import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StateContext from '../context/StateContext';

function Chat() {
  const receiver = useParams().id;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const GlobalState = useContext(StateContext);
  const userId = GlobalState.userId; // assuming this is defined somewhere
  console.log(message, messages, userId, receiver);
  useEffect(() => {
    // fetch previous messages from the backend
    axios.get(`/api/messages/${userId}/${receiver}/`).then((response) => {
      setMessages(response.data);
    });
  }, [userId, receiver]);

  useEffect(() => {
    // create a WebSocket connection
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}/${receiver}/`
    );

    // listen for messages from the WebSocket server
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages([...messages, newMessage]);
    };

    // close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, [userId, receiver, messages]);

  function sendMessage(e) {
    e.preventDefault();

    // send the message to the WebSocket server
    const ws = new WebSocket(
      `ws://localhost:8000/ws/chat/${userId}/${receiver}/`
    );
    ws.onopen = () => {
      ws.send(JSON.stringify({ message }));
      ws.close();
    };

    // add the message to the state
    setMessages([...messages, { sender: userId, message }]);
    setMessage('');
  }

  return (
    <div className="w-full h-[90vh] shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white h-full">
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Welcome to the chat!
              </div>
              <img
                src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                className="object-cover h-8 w-8 rounded-full"
                alt=""
              />
            </div>
            {messages.map((item) => (
              <div
                key={item.id}
                className={`flex justify-${
                  item.sender === userId ? 'end' : 'start'
                } mb-4`}
              >
                <img
                  src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                  className="object-cover h-8 w-8 rounded-full"
                  alt=""
                />
                <div
                  className={`ml-2 py-3 px-4 rounded-${
                    item.sender === userId
                      ? 'bl-3xl rounded-tl-3xl rounded-tr-xl bg-blue-400 text-white'
                      : 'br-3xl rounded-tr-3xl rounded-tl-xl bg-gray-400 text-white'
                  }`}
                >
                  {item.message}
                </div>
              </div>
            ))}
          </div>
          <form className="py-5" onSubmit={sendMessage}>
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
