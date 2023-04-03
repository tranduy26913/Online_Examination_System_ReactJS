import { Box, Button, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import apiLessons from 'apis/apiLessons';

import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CourseContext from '../LayoutCourse/CourseContext';
import CreateLesson from './CreateLesson'

import EditLesson from './EditLesson';
function Lesson() {
  const [lessons, setLessons] = useState([])
  const role = useSelector(state => state.setting.role) || 'student'
  const { courseId, id: courseObjId } = useContext(CourseContext)
  console.log(courseId)
  
  const getData = useCallback(() => {
    if (courseId)
      apiLessons.getListLesson({ courseId },role)
        .then(res => {
          if (Array.isArray(res)) {
            setLessons(res)
          }
        })
  }, [courseId,role])
  useEffect(() => {
    getData()
  }, [getData])
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
                  status={item.status}
                  lessonId={item.id}
                  file={item.file}
                  seen={item.seen}
                  getData={getData} />
              )
            }

          </Stack>
          {role==='teacher' &&
          <Stack>
            <CreateLesson />
          </Stack>
          }
        </Stack>
      </Paper>
    </Box>
  )
}

export default Lesson