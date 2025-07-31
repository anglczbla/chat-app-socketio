import React, { useContext, useEffect, useState } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../context/chatContext'
import { AuthContext } from '../context/AuthContext'

const RightSideBar = () => {

  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  //  get all the image from the message
  useEffect(()=>{
    setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
    )
  },[messages])

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-auto ${selectedUser ? "max-md:hidden" :""}`}>
      
      {/* Profile Section */}
      <div className='pt-8 sm:pt-12 lg:pt-16 px-4 sm:px-6'>
        <div className='flex flex-col items-center gap-3 text-xs font-light'>
          <img 
            src={selectedUser?.profilePic || assets.avatar_icon} 
            alt="" 
            className='w-16 sm:w-20 lg:w-24 aspect-[1/1] rounded-full object-cover' 
          />
          <h1 className='text-lg sm:text-xl font-medium flex items-center gap-2 text-center'>
            {onlineUsers.includes(selectedUser._id) && <p className='w-2 h-2 rounded-full bg-green-500 flex-shrink-0'></p>}
            <span className='break-words'>{selectedUser.fullName}</span>
          </h1>
          <p className='text-center text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs'>
            {selectedUser.bio}
          </p>
        </div>
      </div>

      <hr className='border-[#ffffff50] my-6 mx-4'/>
      
      {/* Media Section */}
      <div className='px-4 sm:px-6 pb-6'>
        <p className='text-sm font-medium mb-3'>Media</p>
        <div className='max-h-[180px] sm:max-h-[200px] lg:max-h-[250px] overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 opacity-80'>
          {msgImages.map((url, index) => (
            <div 
              key={index} 
              onClick={() => window.open(url)}  
              className='cursor-pointer rounded-md overflow-hidden hover:opacity-100 transition-opacity duration-200'
            >
              <img 
                src={url} 
                alt="" 
                className='w-full h-20 sm:h-24 object-cover rounded-md hover:scale-105 transition-transform duration-200'
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Spacer to push logout button to bottom */}
      <div className='flex-grow'></div>
      
      {/* Logout Button */}
      <div className='sticky bottom-0 bg-gradient-to-t from-[#8185B2]/20 to-transparent pt-6 pb-4 sm:pb-6'>
        <div className='px-4 sm:px-6'>
          <button onClick={()=>logout()} className='w-full max-w-xs mx-auto block bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-medium py-2.5 sm:py-3 px-6 rounded-full cursor-pointer hover:from-purple-500 hover:to-violet-700 transition-all duration-200 shadow-lg'>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightSideBar