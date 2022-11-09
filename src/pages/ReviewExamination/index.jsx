import { Box, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import apiTakeExam from 'apis/apiTakeExam'
import Page from 'components/Page'
import moment from 'moment'
import { ButtonQuestion } from 'pages/Examination/Examination.style'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Question from './Question'

function ReviewExamination() {
  const theme = useTheme()
  const { takeExamId } = useParams()

  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [submitTime, setSubmitTime] = useState(new Date())
  const [questions, setQuestions] = useState([])
  const [indexQuestion, setIndexQuestion] = useState([])
  const user = useSelector(state => state.user.info)

  const setupQuestion = (questions) => {
    const newIndexQuestion = []
    setQuestions([])
    for (let question of questions) {
      setQuestions(pre => [...pre, question])
      newIndexQuestion.push({
        isDone: true
      })
    }

    setIndexQuestion(newIndexQuestion)
  }


  useEffect(() => {
    const getQuestions = () => {

      
      if (!takeExamId)
        return

      apiTakeExam.getReviewExam({ takeExamId })
        .then(res => {
          setupQuestion(res?.questions || [])
          setStartTime(res.startTime)
          setSubmitTime(res.submitTime)
        })
    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takeExamId])

  return (
    <Page title={name}>

      <Box className='container' py={2}>
        <Box>
          <Typography
            sx={{
              fontSize: '20px',
              color: theme.palette.primary.main,
              fontWeight: 600,
              mb: 2,
              textAlign: 'center'
            }}>{name}</Typography>
           
          <Stack direction='row' spacing={1.5} alignItems='flex-start'>
          
            <Stack flex={4} spacing={3}><Paper elevation={12}>
              <Stack p={2}>
                <Typography>Thời gian bắt đầu: {moment(startTime).format("DD-MM-YYYY HH:mm")}</Typography>
                <Typography>Thời gian nộp bài: {moment(submitTime).format("DD-MM-YYYY HH:mm")}</Typography>
              </Stack>
            </Paper>
              {
                questions.map((item, index) =>
                  <Question key={item.id || item._id}
                    question={item} index={index} />)
              }
            </Stack>
            <Paper elevation={24} sx={{
              position: 'sticky',
              top: '5rem',
              flex: 1
            }}>

              <Stack spacing={1} p={1.5}>
                <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                <Grid container spacing={0.5}>
                  {
                    indexQuestion.map((item, index) =>
                      <Grid key={index} item xs={2}>
                        <ButtonQuestion className={`${item.isDone ? 'done' : ''} ${item.isFlag ? 'flag' : ''}`}
                          onClick={() => document.getElementById(`question-${index}`)
                            .scrollIntoView({ block: 'center', behavior: "smooth" })}
                        >{index + 1}</ButtonQuestion>
                      </Grid>)
                  }
                </Grid>

              </Stack>
            </Paper>
          </Stack>
        </Box>

      </Box>

    </Page>
  )
}


export default ReviewExamination
