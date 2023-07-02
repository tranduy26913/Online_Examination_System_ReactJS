import React from 'react'
import { useLocation } from 'react-router-dom'

function ChatMessenger() {
  const location = useLocation()
  const isTakeExam = location.pathname.includes('/exam/') ? true : false

  return (
    <>
      <div id="fb-root" style={{ display: `${isTakeExam ? 'none' : 'block'}` }}></div>
    </>
  )
}

export default ChatMessenger