import React from 'react'
import {Button} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
function ButtonBack() {
    const navigate = useNavigate();

    const onClick = ()=> {
        navigate(-1)
    }
  return (
    <Button
    onClick={onClick}
     startIcon={<ArrowBackIosIcon/>}>Quay lại</Button>
  )
}

export default ButtonBack