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
import { updateQuestionInFile } from 'slices/userSlice';
import LoadingButton from 'components/LoadingButton';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { toast } from 'react-toastify';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';

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
        backgroundColor: isCheck ? theme.palette.primary.main : theme.palette.background.paper
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
  const [answers, setAnswers] = useState(question ? question.answers : [])
  const [maxPoints, setMaxPoints] = useState(1)
  const [loading, setLoading] = useState(false)
  const [typeAnswer, setTypeAnswer] = useState('single')//single:1 ????p ??n ????ng, multi: nhi???u ????p ??n ????ng
  const dispatch = useDispatch()
  const refreshToken = useSelector(state => state.auth.refreshToken)

  const handleChangeMaxPoints = (e) => {
    setMaxPoints(e.target.value)
  }

  useEffect(() => {
    if (question) {
      console.log(question)
      setContent(question.content)
      setMaxPoints(question.maxPoints)
      setTypeAnswer(question.type)
      let newAnswers = question.answers?.map(item => ({ ...item })) || []
      setAnswers(newAnswers)
    }
    else {
      handleClearData()
    }
  }, [question])

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
    const newAnswers = answers.map(e => ({ ...e }))
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
    let newAnswers = answers.map(e => ({ ...e }))
    const answerIndex = answers.findIndex(item => item.id === idAnswer)
    if (answerIndex > -1) {
      if (typeAnswer === 'single') {
        newAnswers = newAnswers.map(item => {
          const newAnswer = item
          if (newAnswer.id === idAnswer)
            newAnswer.isCorrect = true
          else
            newAnswer.isCorrect = false
          return newAnswer
        })
      }
      else
        newAnswers[answerIndex].isCorrect = !newAnswers[answerIndex].isCorrect
    }
    if (checkAnswers(newAnswers)) {
      setAnswers(newAnswers)
    }
    else {
      toast.warning('C??u h???i ph???i c?? ??t nh???t 1 ????p ??n ????ng')
      return
    }
  }, [answers, typeAnswer])

  const checkAnswers = (answers) => {
    return answers.some(e => e.isCorrect)
  }
  const checkQuestion = () => {
    if (!content) {
      toast.warning('C??u h???i ph???i c?? n???i dung')
      return false
    }
    if (Number(maxPoints) <= 0) {
      toast.warning('??i???m t???i ??a ph???i l???n h??n 0')
      return false
    }
    if (Number.isNaN(Number(maxPoints))) {
      toast.warning('??i???m t???i ??a kh??ng h???p l???')
      return false
    }
    if (answers.length === 0) {
      toast.warning('C??u h???i ph???i c?? ??t nh???t 1 ????p ??n')
      return false
    }
    if (!checkAnswers(answers)) {
      toast.warning('C??u h???i ph???i c?? ??t nh???t 1 ????p ??n ????ng')
      return false
    }
    return true
  }

  const handleEditQuestion = () => {
    if (!checkQuestion()) return

    const params = {
      id,
      content,
      maxPoints,
      type: typeAnswer,
      answers
    }
    dispatch(updateQuestionInFile(params))
    //props.handleSelectQuestion('')
  }


  const handleClearData = () => {
    setContent('')
    setAnswers([])
    setMaxPoints(1)
    setTypeAnswer('single')
  }
  return (

    <Stack spacing={1.5} mb={2} px={2}>
      <Typography fontWeight={600} align='center' mb={1}>Nh???p n???i dung c??u h???i</Typography>
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
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}

      />
      <TextField
        label='??i???m t???i ??a'
        value={maxPoints}
        variant='standard'
        onChange={handleChangeMaxPoints}
      />
      <FormControl>
        <FormLabel>S??? ????p ??n ????ng</FormLabel>
        <RadioGroup
          row
          name="type-answer"
          value={typeAnswer}
          onChange={handleChangeTypeAnswer}
        >
          <FormControlLabel value="single" control={<Radio />} label="M???t ????p ??n ????ng" />
          <FormControlLabel value="multi" control={<Radio />} label="Nhi???u ????p ??n ????ng" />
        </RadioGroup>
      </FormControl>
      {

        answers.map((item, index) =>
          <Stack key={item.id} direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

            <TextField variant='standard' size='small' fullWidth
              label={`????p ??n ${alphabet[index]}`} value={item.content}
              onChange={e => handleChangeInputAnswer(e, item.id)} />
            <BoxCheck isCheck={item.isCorrect} onClick={() => handleChooseCorrect(item.id)} />
            <BoxDelete onClick={() => handleDeleteAnswer(item.id)} />
          </Stack>)
      }

      <Stack direction='row' justifyContent='center' >
        <Button onClick={handleAddAnswer} variant='outlined'>Th??m ????p ??n</Button></Stack>
      <Stack direction={'row'} spacing={1.5} justifyContent='flex-end'>
        {/* <Button variant='contained' color='error'>Hu???</Button> */}
        <Button onClick={handleClearData} variant='contained' color='warning'>L??m m???i</Button>
        <LoadingButton loading={loading} variant='contained'
          onClick={handleEditQuestion}> L??u c??u h???i</LoadingButton>
      </Stack>
    </Stack>

  )
}

export default CreateQuestion