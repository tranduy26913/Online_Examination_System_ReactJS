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
import apiQuestion from 'apis/apiQuestion';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteQuestion } from 'slices/userSlice';
import DOMPurify from 'dompurify';

const BoxAnswer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  gap: '10px'
}))


const DetailQuestion = (props) => {
  const question = props.question
  const examId = props.examId
  const dispatch = useDispatch()
  const onClickEdit = () => {
    props.handleEdit(props.id)
  }
  const handleDeleteQuestion = ()=>{
    const params = {
      examId,
      questionId:props.id
    }
    const id = toast.loading("Đang xoá...")
    apiQuestion.deleteQuestion(params)
    .then(res=>{
      dispatch(deleteQuestion(props.id))
      toast.update(id,{render:'Xoá câu hỏi thành công',isLoading:false,type:'success',autoClose:1200})
    })
    .catch(err=>{
      console.log(err)
      toast.update(id,{render:'Xoá câu hỏi không thành công',isLoading:false,type:'warning',autoClose:1200})
    })
  }
  return (
    <Stack spacing={0.5}>
      <Typography mb={1} fontSize='16px'
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}>
      
      </Typography>
      {
        question.answers.map(item =>
          <BoxAnswer key={item.id}><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color={item.isCorrect ? 'success' : 'error'} />{item.content}</BoxAnswer>
        )
      }
      <Stack direction='row' justifyContent={'flex-end'}>
        <Button onClick={onClickEdit} startIcon={<BorderColorIcon />}>Sửa</Button>
        <Button onClick={handleDeleteQuestion} startIcon={<DeleteForeverIcon />}>Xoá</Button>
      </Stack>
    </Stack>
  )
}

export default DetailQuestion