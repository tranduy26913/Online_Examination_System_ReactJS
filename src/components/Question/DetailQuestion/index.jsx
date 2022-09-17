import {
  Stack,
  Button,
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary, AccordionDetails, styled
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react'

const BoxAnswer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  gap: '10px'
}))


const DetailQuestion = (props) => {

  const onClickEdit = ()=>{
    props.handleEdit(props.id)
  }
  return (
          <Stack spacing={0.5}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='success' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <Stack direction='row' justifyContent={'flex-end'}>
              <Button onClick={onClickEdit} startIcon={<BorderColorIcon/>}>Sửa</Button>
              <Button startIcon={<DeleteForeverIcon/>}>Xoá</Button>
            </Stack>
          </Stack>
  )
}

export default DetailQuestion