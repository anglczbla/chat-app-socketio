import React, { useEffect, useRef } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const scrollEnd = useRef();
  
  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesDummyData]); // Tambahkan dependency

  // Debug log
  console.log("Selected User:", selectedUser);
  console.log("Messages Data:", messagesDummyData);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ----- header ----- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img src={selectedUser.profilePic || assets.avatar_icon} alt="" className="w-8 rounded-full" />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName || "Unknown User"}
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden max-w-7 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="max-md:hidden max-w-5" />
      </div>

      {/* ---- chat area ------ */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll px-4 py-3 pb-6">
        {messagesDummyData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-end gap-3 mb-4 max-w-[85%] ${
              msg.senderId === "680f50e4f10f3cd28382ecf9" 
                ? "ml-auto" 
                : "mr-auto"
            }`}
          >
            {/* Avatar - tampil di kiri untuk pesan orang lain, kanan untuk pesan sendiri */}
            {msg.senderId !== "680f50e4f10f3cd28382ecf9" && (
              <div className="text-center text-xs flex-shrink-0">
                <img
                  src={selectedUser.profilePic || assets.profile_martin}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-gray-500 mt-1">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            )}

            {/* Message Content */}
            <div className="flex flex-col">
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[280px] w-full border border-gray-600 rounded-2xl overflow-hidden"
                />
              ) : (
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[320px] break-words ${
                    msg.senderId === "680f50e4f10f3cd28382ecf9"
                      ? "bg-violet-500 text-white rounded-br-md"
                      : "bg-gray-700 text-white rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              )}
            </div>

            {/* Avatar untuk pesan sendiri */}
            {msg.senderId === "680f50e4f10f3cd28382ecf9" && (
              <div className="text-center text-xs flex-shrink-0">
                <img
                  src={assets.avatar_icon}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-gray-500 mt-1">
                  {formatMessageTime(msg.createdAt)}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* ------------- bottom area -----------------*/}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex-1 flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600">
          <input 
            type="text" 
            placeholder="Send a message" 
            className="flex-1 text-sm py-2 border-none outline-none text-white placeholder-gray-400 bg-transparent" 
          />
          <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 ml-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
          </label>
        </div>
        <button className="p-2 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors">
          <img src={assets.send_button} alt="" className="w-5 h-5" />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full">
      <img src={assets.logo_icon} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-white">Chat anytime anywhere</p> 
    </div>
  );
};

export default ChatContainer;