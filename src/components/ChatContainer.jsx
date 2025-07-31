import React, { useContext, useEffect, useRef, useState } from "react";
import assets from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } =
    useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // handle send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "" && !selectedFile) return null;
    
    if (selectedFile) {
      // Send image
      const reader = new FileReader();
      reader.onload = async () => {
        await sendMessage({ image: reader.result });
        setImagePreview(null);
        setSelectedFile(null);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Send text
      await sendMessage({ text: input.trim() });
    }
    setInput("");
  };

  // handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    
    // Reset file input
    e.target.value = "";
  };

  // Cancel image preview
  const cancelImagePreview = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ----- header ----- */}
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.fullName || "Unknown User"}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
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
        {messages.map((msg, index) => {
          const isMyMessage = msg.senderId === authUser._id;
          
          return (
            <div
              key={index}
              className={`flex items-end gap-3 mb-4 max-w-[85%] ${
                isMyMessage ? 'ml-auto' : 'mr-auto'
              }`}
            >
              {/* Avatar untuk pesan orang lain (kiri) */}
              {!isMyMessage && (
                <div className="text-center text-xs flex-shrink-0">
                  <img
                    src={selectedUser.profilePic || assets.avatar_icon}
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
                      isMyMessage
                        ? "bg-violet-500 text-white rounded-br-md"
                        : "bg-gray-700 text-white rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                )}
              </div>

              {/* Avatar untuk pesan sendiri (kanan) */}
              {isMyMessage && (
                <div className="text-center text-xs flex-shrink-0">
                  <img
                    src={authUser.profilePic || assets.avatar_icon}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-gray-500 mt-1">
                    {formatMessageTime(msg.createdAt)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="absolute bottom-20 left-4 right-4 bg-gray-800 p-4 rounded-lg border border-gray-600">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Image Preview</span>
            <button
              onClick={cancelImagePreview}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Cancel
            </button>
          </div>
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-full max-h-32 rounded-lg"
          />
        </div>
      )}

      {/* ------------- bottom area -----------------*/}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex-1 flex items-center bg-gray-800/50 px-4 py-2 rounded-full border border-gray-600">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder={imagePreview ? "Send image..." : "Send a message"}
            className="flex-1 text-sm py-2 border-none outline-none text-white placeholder-gray-400 bg-transparent"
            disabled={!!imagePreview}
          />
          <input
            onChange={handleImageSelect}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 ml-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
            />
          </label>
        </div>
        <button 
          onClick={handleSendMessage}
          className="p-2 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors"
        >
          <img
            src={assets.send_button}
            alt=""
            className="w-5 h-5"
          />
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