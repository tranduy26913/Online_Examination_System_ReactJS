import {
  Stack,
  Button,
  Box,
  Typography, styled
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
  const question = props.question
  const onClickEdit = () => {
    props.handleEdit(props.id)
  }
  return (
    <Stack spacing={0.5}>
      <Typography>
        {question.content}
      </Typography>
      {
        question.answers.map(item =>
          <BoxAnswer key={item.id}><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color={item.isCorrect ? 'success' : 'error'} />{item.content}</BoxAnswer>
        )
      }
      <Stack direction='row' justifyContent={'flex-end'}>
        <Button onClick={onClickEdit} startIcon={<BorderColorIcon />}>Sửa</Button>
        <Button startIcon={<DeleteForeverIcon />}>Xoá</Button>
      </Stack>
    </Stack>
  )
}

export default DetailQuestion