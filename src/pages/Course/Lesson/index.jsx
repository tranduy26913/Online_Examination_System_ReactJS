import { Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import apiLessons from 'apis/apiLessons';

import { useCallback, useContext, useEffect, useState } from 'react'
import CourseContext from '../LayoutCourse/CourseContext';
import CreateLesson from './CreateLesson'

import EditLesson from './EditLesson';
function Lesson() {
  const [lessons, setLessons] = useState([])

  const { courseId, id: courseObjId } = useContext(CourseContext)
  console.log(courseId)
  const getData = useCallback(() => {
    apiLessons.getListLesson({ courseId })
      .then(res => {
        if (Array.isArray(res)) {
          setLessons(res)
        }
      })
  }, [courseId])
  useEffect(() => {
    getData()
  }, [])
  return (
    <Box>
      <Paper>
        <Stack
          px={3} py={1}
          spacing={2}>
          <Typography align='center' color='primary' fontSize={'24px'}>Nội dung khoá học</Typography>
          <Stack spacing={3}>
            {
              lessons.map(item =>
                <EditLesson key={item.id}
                  content={item.content}
                  name={item.name}
                  isPublic={item.isPublic}
                  lessonId={item.id}
                  getData={getData} />
              )
            }

          </Stack>
          <Stack>
            <CreateLesson />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export default Lesson