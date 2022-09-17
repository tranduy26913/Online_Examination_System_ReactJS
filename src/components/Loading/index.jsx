import React from 'react'
import {CircularProgress}  from "@mui/material"

const Loading = (props)=> {

  return (
    <CircularProgress 
        sx={{
            color:props.color||"#1890ff",
            mr:"4px"
        }}
        size={props.size || 20}
        thickness={3}
        />

  )
}

export default Loading