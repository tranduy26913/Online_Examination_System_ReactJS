import {
  Box,
  Button,
  Stack
} from '@mui/material'
import CreateQuestion from 'components/Question/CreateQuestion'
import DetailQuestion from 'components/Question/DetailQuestion'
import React, { useCallback, useState } from 'react'

type Props = {
  type: 'create' | 'edit' | 'detail'
}
const CreateExamination: React.FC = () => {
  const isCreateQuestion = false
  const [idQuestion, setIdQuestion] = useState<string>('')

  const handleSelectQuestionEdit = useCallback((value:string)=>setIdQuestion(value),[])
  return (
    <Stack spacing={1}>
      {questions.map(item =>
        idQuestion === item.id ? 
        <CreateQuestion edit={true} id={idQuestion} 
        question={item.question}
        answers = {item.answers} /> : <DetailQuestion id={item.id} handleEdit={handleSelectQuestionEdit} />
      )}
      <CreateQuestion edit={false} id='' />
      <Button variant='contained'>Tạo câu hỏi mới</Button>
    </Stack>
  )
}


const questions = [
  {
    id: '1',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
  {
    id: '2',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
  {
    id: '3',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
]

export default CreateExamination