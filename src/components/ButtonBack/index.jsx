import React from 'react'
import { Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
function ButtonBack({onClick}) {
  
  return (
    <Button
      onClick={onClick}
      startIcon={<SaveAltIcon />}>Xuất File</Button>
  )
}

export default ButtonBack