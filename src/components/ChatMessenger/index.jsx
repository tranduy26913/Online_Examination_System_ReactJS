import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ChatMessenger() {
  const location = useLocation()
  const isTakeExam = location.pathname.includes('/exam/') ? true : false
  useEffect(() => {
    var fb = document.getElementById("fb-root")
    if (fb) {
      fb.style.display = isTakeExam ? 'none' : 'block'

    }
  }, [isTakeExam])
  return (
    <>
      <div id="fb-root2" style={{ display: `${isTakeExam ? 'none' : 'block'}` }}></div>
    </>
  )
}

export default ChatMessenger