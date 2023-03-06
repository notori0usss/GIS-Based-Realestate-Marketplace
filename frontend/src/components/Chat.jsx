import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('0d100fa8463c75b144ba', {
      cluster: 'ap2',
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', function (data) {
      set;
    });
  }, []);
  function sendMessage(e) {
    e.preventDefault();
  }
  return (
    <div className="w-full h-[90vh] shadow-lg rounded-lg">
      <div className="flex flex-row justify-between bg-white h-full">
        <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
          {messages.map((item) => (
            <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">{item.userId}</div>
                <span className="text-gray-500">{item.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full px-5 flex flex-col justify-between">
          <div className="flex flex-col mt-5">
            <div className="flex justify-end mb-4">
              <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Welcome to group everyone !
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
                happy holiday guys!
              </div>
            </div>
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
