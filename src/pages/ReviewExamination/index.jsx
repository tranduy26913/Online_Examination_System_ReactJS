import {
  Box, Grid, Paper, Stack, Typography, useTheme,
  AccordionSummary, Accordion,
  AccordionDetails
} from '@mui/material'
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const style = {
    flexDirection: { xs: 'column', md: 'row' },
    gap: '12px',
    '&>div:nth-of-type(1)': {
      'order': { xs: 2, md: 1 }
    },
    '&>div:nth-of-type(2)': {
      'order': { xs: 1, md: 2 },
      width: '100%'
    }
  }
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

          <Stack sx={style} alignItems='flex-start'>

            <Stack width='100%' flex={{ xs: 1, md: 3, lg: 4 }} spacing={3}><Paper elevation={12}>
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
            <Stack flex={1} spacing={2} sx={{
              position: 'sticky',
              top: '5rem',
            }}>

              <Paper elevation={24} >

                <Stack spacing={1} p={1.5}>
                  <Accordion
                    sx={{
                      boxShadow: 'none'
                    }} defaultExpanded disableGutters TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      padding: 0
                    }}>
                      <Grid container spacing={0.5}>
                        {
                          indexQuestion.map((item, index) =>
                            <Grid key={index}  xs={1.5} sm={1} md={3} lg={2}item >
                              <ButtonQuestion className={`${item.isDone ? 'done' : ''} ${item.isFlag ? 'flag' : ''}`}
                                onClick={() => document.getElementById(`question-${index}`)
                                  .scrollIntoView({ block: 'center', behavior: "smooth" })}
                              >{index + 1}</ButtonQuestion>
                            </Grid>)
                        }
                      </Grid>
                    </AccordionDetails>
                  </Accordion>


                </Stack>
              </Paper>
            </Stack>
          </Stack>
        </Box>

      </Box>

    </Page>
  )
}


export default ReviewExamination
