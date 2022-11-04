import { Box, Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import Page from 'components/Page'
import { ButtonQuestion } from 'pages/Examination/Examination.style'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Question from './Question'

function ReviewExamination() {
  const theme = useTheme()
  const paramUrl = useParams()

  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [examId, setExamId] = useState(paramUrl.examId || '')
  const [endTime, setEndTime] = useState()

  const [questions, setQuestions] = useState([])
  const [indexQuestion, setIndexQuestion] = useState([])
  const user = useSelector(state => state.user.info)

const exam = samples
  const setupQuestion = (questions) => {
    const newIndexQuestion = []
    setQuestions([])
    for (let question of questions) {
      setQuestions(pre => [...pre, question])
      newIndexQuestion.push({
        isFlag: false,
        isDone: false
      })
    }

    setIndexQuestion(newIndexQuestion)
  }


  useEffect(() => {
    const getQuestions = () => {
      setQuestions(samples.questions)
      if (!user)
        return
      if (!examId)
        return

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId])

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
            }}>Bài kiểm tra số 1</Typography>
          <Stack direction='row' spacing={1.5} alignItems='flex-start'>

            <Stack flex={4} spacing={3}>
              {
                questions.map((item, index) =>
                  <Question key={item.id}
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
                      <Grid key={index} xs={2}>
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


const samples = {
  "id": "dddd",
  "name": "Đề thi toán",
  "startTime": '...',
  "submitTime": '...',
  "questions": [
      {
          "_id": "6363b1d35465a5117901066c",
          "type": "single",
          "content": "<p>1+1=</p>",
          "choose":  ['6363b1d35465a5117901066d', '6363b1d35465a5117901066d'],
          "answers": [
              {
                  "content": "1",
                  "id": "6363b1d35465a5117901066d"
              },
              {
                  "content": "2",
                  "id": "6363b1d35465a5117901066d"
              },
              {
                  "content": "4",
                  "id": "6363b1d35465a51179010670"
              },
              {
                  "content": "3",
                  "id": "6363b1d35465a5117901066f"
              }
          ],
          "image": "",
          "maxPoints": 1,
          "createdAt": "2022-11-03T12:19:32.125Z",
          "updatedAt": "2022-11-03T12:19:32.125Z",
          "id": "6363b1d35465a5117901066c"
      },
      {
          "_id": "6363b2195465a5117901067c",
          "type": "single",
          "content": "<p>1+1=</p>",
          "choose":  ['6363b2195465a5117901067e'],
          "answers": [
              {
                  "content": "4",
                  "id": "6363b2195465a51179010680"
              },
              {
                  "content": "2",
                  "id": "6363b2195465a5117901067e"
              },
              {
                  "content": "1",
                  "id": "6363b2195465a5117901067d"
              },
              {
                  "content": "3",
                  "id": "6363b2195465a5117901067f"
              }
          ],
          "image": "",
          "maxPoints": 1,
          "createdAt": "2022-11-03T12:20:41.610Z",
          "updatedAt": "2022-11-03T12:20:41.610Z",
          "id": "6363b2195465a5117901067c"
      },
      {
          "_id": "6363b2325465a5117901068d",
          "type": "single",
          "content": "<p>2+2=</p>",
          "choose":  ['6363b2325465a5117901068e'],
          "answers": [
              {
                  "content": "5",
                  "id": "6363b2325465a51179010691"
              },
              {
                  "content": "1",
                  "id": "6363b2325465a5117901068e"
              },
              {
                  "content": "2",
                  "id": "6363b2325465a5117901068f"
              },
              {
                  "content": "4",
                  "id": "6363b2325465a51179010690"
              }
          ],
          "image": "",
          "maxPoints": 1,
          "createdAt": "2022-11-03T12:21:06.645Z",
          "updatedAt": "2022-11-03T12:21:06.645Z",
          "id": "6363b2325465a5117901068d"
      },
      {
          "_id": "6363b2505465a5117901069f",
          "type": "multi",
          "content": "<p>Số lớn hơn 5</p>",
          "answers": [
              {
                  "content": "6",
                  "id": "6363b2505465a511790106a3"
              },
              {
                  "content": "1",
                  "id": "6363b2505465a511790106a0"
              },
              {
                  "content": "4",
                  "id": "6363b2505465a511790106a2"
              },
              {
                  "content": "2",
                  "id": "6363b2505465a511790106a1"
              },
              {
                  "content": "7",
                  "id": "6363b2505465a511790106a4"
              }
          ],
          "image": "",
          "maxPoints": 1,
          "createdAt": "2022-11-03T12:21:37.086Z",
          "updatedAt": "2022-11-03T12:21:37.086Z",
          "id": "6363b2505465a5117901069f"
      },
      {
          "_id": "6363b4c85465a511790106b4",
          "type": "multi",
          "content": "<p>1+2 &lt;</p>",
          "answers": [
              {
                  "content": "-1",
                  "id": "6363b4c85465a511790106b5"
              },
              {
                  "content": "4",
                  "id": "6363b4c85465a511790106b8"
              },
              {
                  "content": "5",
                  "id": "6363b4c85465a511790106b9"
              },
              {
                  "content": "1",
                  "id": "6363b4c85465a511790106b6"
              },
              {
                  "content": "3",
                  "id": "6363b4c85465a511790106b7"
              }
          ],
          "image": "",
          "maxPoints": 1,
          "createdAt": "2022-11-03T12:32:09.596Z",
          "updatedAt": "2022-11-03T12:32:09.596Z",
          "id": "6363b4c85465a511790106b4"
      }
  ],
}
export default ReviewExamination
