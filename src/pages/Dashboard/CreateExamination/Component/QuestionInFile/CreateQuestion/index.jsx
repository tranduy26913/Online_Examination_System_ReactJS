import {
  Stack,
  Button,
  TextField,
  FormControlLabel,
  Typography,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/system';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  updateQuestionInFile } from 'slices/userSlice';
import LoadingButton from 'components/LoadingButton';
import { MyUploadAdapter } from './MyCustomUploadAdapterPlugin';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const alpha = Array.from(Array(10)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const BoxCheck = ({ isCheck, onClick }) => {
  const theme = useTheme()
  return (
    <Stack onClick={onClick}
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        backgroundColor: isCheck ? theme.palette.primary.main : '#fff'
      }}>
      <CheckIcon
        sx={{
          color: isCheck ? '#fff' : theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}
const BoxDelete = ({ onClick }) => {
  const theme = useTheme()
  return (
    <Stack onClick={onClick}
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
      }}>
      <DeleteOutlineIcon
        sx={{
          color: theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}

const CreateQuestion = (props) => {
  const { question, id } = props
  const [content, setContent] = useState(question ? question.content : '')
  const [answers, setAnswers] = useState(question ?question.answers: [])
  const [maxPoints, setMaxPoints] = useState()
  const [loading, setLoading] = useState(false)
  const [typeAnswer, setTypeAnswer] = useState('single')//single:1 đáp án đúng, multi: nhiều đáp án đúng
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.auth.refreshToken)

  const handleChangeMaxPoints = (e) => {
    setMaxPoints(e.target.value)
  }

  useEffect(()=>{
    if(question){
      setContent(question.content)
      setMaxPoints(question.maxPoints)
      setTypeAnswer(question.type)
      let newAnswers = question.answers?.map(item=>({...item})) || []
      setAnswers(newAnswers)
    }
  },[question])

  const handleChangeTypeAnswer = (e) => {
    setTypeAnswer(e.target.value)
    if (e.target.value === 'single') {
      let newAnswers = [...answers]
      newAnswers = newAnswers.map(item => {
        const newAnswer = item
        newAnswer.isCorrect = false
        return newAnswer
      })
      setAnswers(newAnswers)
    }
  }
  const handleAddAnswer = () => {
    let len = (answers.length || 0) + 1
    const newAnswer = {
      id: len,
      content: '',
      isCorrect: false,
    }
    setAnswers(pre => [...pre, newAnswer])
  }

  const handleDeleteAnswer = useCallback((idAnswer) => {
    let newAnswers = [...answers]
    newAnswers = newAnswers.filter(item => item.id !== idAnswer)
    setAnswers(newAnswers)
  }, [answers])

  const handleChangeInputAnswer = (e, idAnswer) => {
    const newAnswers = [...answers]
    const answerIndex = answers.findIndex(item => item.id === idAnswer)
    if (answerIndex > -1) {
      newAnswers[answerIndex] = {
        ...answers[answerIndex],
        content: e.target.value
      }

      setAnswers(newAnswers)
    }
  }

  const handleChooseCorrect = useCallback((idAnswer) => {
    let newAnswers = [...answers]
    const answerIndex = answers.findIndex(item => item.id === idAnswer)
    if (answerIndex > -1) {
      if (typeAnswer === 'single') {
        newAnswers = newAnswers.map(item => {
          const newAnswer = item
          if (newAnswer.id === idAnswer)
            newAnswer.isCorrect = !newAnswer.isCorrect
          else
            newAnswer.isCorrect = false
          return newAnswer
        })
      }
      else  
        newAnswers[answerIndex].isCorrect = !newAnswers[answerIndex].isCorrect
    }
    setAnswers(newAnswers)
  }, [answers, typeAnswer])


  const handleEditQuestion = () => {
    const params = {
      id,
      content,
      maxPoints,
      type: typeAnswer,
      answers
    }
    dispatch(updateQuestionInFile(params))
  }

  const handleClearData = () => {
    setContent('')
    setAnswers([])
    setMaxPoints(1)
    setTypeAnswer('single')
  }
  return (

    <Stack spacing={1.5} mb={2} p={2}>
      <Typography fontWeight={600} mb={1}>Nhập nội dung câu hỏi</Typography>
      <CKEditor
        editor={DecoupledEditor}
        data={content}
        onReady={editor => {

          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
          editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader, refreshToken);
          };
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}

      />
      <TextField
        label='Điểm tối đa'
        value={maxPoints}
        variant='standard'
        onChange={handleChangeMaxPoints}
      />
      <FormControl>
        <FormLabel>Số đáp án đúng</FormLabel>
        <RadioGroup
          row
          name="controlled-radio-buttons-group"
          value={typeAnswer}
          onChange={handleChangeTypeAnswer}
        >
          <FormControlLabel value="single" control={<Radio />} label="Một đáp án đúng" />
          <FormControlLabel value="multi" control={<Radio />} label="Nhiều đáp án đúng" />
        </RadioGroup>
      </FormControl>
      {

        answers.map((item, index) =>
          <Stack direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

            <TextField variant='standard' size='small' fullWidth
              label={`Đáp án ${alphabet[index]}`} value={item.content}
              onChange={e => handleChangeInputAnswer(e, item.id)} />
            <BoxCheck isCheck={item.isCorrect} onClick={() => handleChooseCorrect(item.id)} />
            <BoxDelete onClick={() => handleDeleteAnswer(item.id)} />
          </Stack>)
      }

      <Stack direction='row' justifyContent='center' >
        <Button onClick={handleAddAnswer} variant='outlined'>Thêm đáp án</Button></Stack>
      <Stack direction={'row'} spacing={1.5} justifyContent='flex-end'>
        {/* <Button variant='contained' color='error'>Huỷ</Button> */}
        <Button onClick={handleClearData} variant='contained' color='warning'>Làm mới</Button>
        <LoadingButton loading={loading} variant='contained'
          onClick={handleEditQuestion}> Lưu câu hỏi</LoadingButton>
      </Stack>
    </Stack>

  )
}

export default CreateQuestion