import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { askQuestion } from "../reduxtool/chatSlice";

const ChatData = ({ chatOpen, setChatOpen }) => {
  const dispatch = useDispatch();
  const { qa } = useSelector((state) => state.chat);

  const [msg, setMsg] = useState("");
  const chatEndRef = useRef(null);

  const sendMessage = () => {
    if (!msg.trim()) return;

    dispatch(askQuestion(msg)); 
    setMsg("");
  };

 
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [qa]);

  return (
    <>
    
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50
        flex flex-col transition-transform duration-300
        ${chatOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <h2 className="font-semibold">AI Assistant</h2>
          <button onClick={() => setChatOpen(false)}>❌</button>
        </div>

        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {qa.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Ask me anything about your project 😊
            </p>
          )}

          {qa.map((item, i) => (
            <div key={i} className="space-y-2">

              <div className="flex justify-end">
                <div className="max-w-[75%] bg-blue-600 text-white p-3 rounded-2xl rounded-br-none shadow">
                  <p className="font-semibold">You</p>
                  <p>{item.q}</p>
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[75%] bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none shadow border">
                  <p className="font-semibold text-blue-600">AI</p>
                  <p>{item.a}</p>
                </div>
              </div>

            </div>
          ))}

        </div>

        <div className="p-3 border-t flex gap-2 bg-white">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border p-2 rounded-full px-3 bg-gray-50"
            placeholder="Type your question..."
          />

          <button
            onClick={sendMessage}
            className="px-4 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>

    
      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 
                   rounded-full shadow-xl hover:bg-blue-700 transition-all z-50"
      >
        💬 Chat
      </button>
    </>
  );
};

export default ChatData;
