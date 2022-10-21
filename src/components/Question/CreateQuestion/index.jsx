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
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/system';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { faker } from '@faker-js/faker';
import { useCallback } from 'react';
import apiQuestion from 'apis/apiQuestion';
import apiExamination from 'apis/apiExamination';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion, updateQuestion } from 'slices/userSlice';
import LoadingButton from 'components/LoadingButton';

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
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
  const isEdit = props.edit
  const examId = props.examId
  const question = props.question
  const id = props.id
  const [content, setContent] = useState(question ? question.content : '')
  const [answers, setAnswers] = useState(question ? question.answers : [])
  const [loading, setLoading] = useState(false)
  const [typeAnswer, setTypeAnswer] = useState('single')//single:1 đáp án đúng, multi: nhiều đáp án đúng
  const QUESTIONS = useSelector(state => state.question.value)
  const dispatch = useDispatch()

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
    const newAnswer = {
      id: faker.datatype.uuid(),
      content: '',
      isCorrect: false,
    }
    setAnswers(pre => [...pre, newAnswer])
  }

  const handleDeleteAnswer = useCallback((idAnswer) => {
    let newAnswers = [...answers]
    newAnswers = newAnswers.filter(item => item.id !== idAnswer)
    console.log(newAnswers)
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

  const handleCreateQuestion = async () => {
    const params = {
      content,
      maxPoint: 1,
      tag: [],
      type: typeAnswer,
      embededMedia: "",
      answers
    }
    setLoading(true)
    apiQuestion.postQuestion(params)
      .then(async (res) => {
        
        // let answerResponses = []
        // for (let i = 0; i < answers.length; i++) {
        //   const newAnswer = {...answers[i],questionId:res.id}
        //   const response = await apiQuestion.postAnswers(newAnswer)
        //   answerResponses.push(response)
        // }
        // const newQuestion = {
        //   ...res,
        //   answers: answerResponses
        // }
        if (examId) {
          const questionIds = QUESTIONS.map(item => item.id)
          questionIds.push(res.id)
          apiExamination.updateExamination({
            questions: questionIds
          }, examId)

        }
        dispatch(addQuestion(res))
      })
      .finally(()=>setLoading(false))

  }

  const handleEditQuestion = ()=>{
    const params = {
      content,
      maxPoint: 1,
      tag: [],
      type: typeAnswer,
      embededMedia: "",
      answers
    }
    setLoading(true)
    apiQuestion.updateQuestion(params,id)
      .then((res) => {
        
        dispatch(updateQuestion(res))
      })
      .finally(()=>{
        setLoading(false)
        props.handleSelectQuestion("")
      })
  }

  return (

    <Stack spacing={1.5} mb={2} p={2}>
      <Typography fontWeight={600} mb={1}>Nhập nội dung câu hỏi</Typography>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
        onBlur={(event, editor) => {
        }}
        onFocus={(event, editor) => {
        }}
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
        <Button variant='contained' color='error'>Huỷ</Button>
        <Button variant='contained' color='warning'>Làm mới</Button>
        <LoadingButton loading={loading} variant='contained' 
        onClick={isEdit?handleEditQuestion:handleCreateQuestion}>{isEdit?'Sửa':'Tạo'} câu hỏi</LoadingButton>
      </Stack>
    </Stack>

  )
}

export default CreateQuestion