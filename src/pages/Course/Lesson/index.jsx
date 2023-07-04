import { Box, Paper, Stack, Typography } from '@mui/material'
import apiLessons from 'apis/apiLessons';

import { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CourseContext from '../LayoutCourse/CourseContext';
import CreateLesson from './CreateLesson'

import EditLesson from './EditLesson';
import Page from 'components/Page';
function Lesson() {
  const [lessons, setLessons] = useState([])
  const role = useSelector(state => state.setting.role) || 'student'
  const { courseId, } = useContext(CourseContext)

  const getData = useCallback(() => {
    if (courseId)
      apiLessons.getListLesson({ courseId }, role)
        .then(res => {
          if (Array.isArray(res)) {
            setLessons(res)
          }
        })
  }, [courseId, role])
  useEffect(() => {
    getData()
  }, [getData])
  return (
    <Page title="Bài giảng">
      <Box>
        <Paper>
          <Stack
            px={3} py={1}
            spacing={2}>
            <Typography align='center' color='primary' fontSize={'24px'}>Nội dung khoá học</Typography>
            <Stack spacing={3}>
              {
                lessons.map(item =>
                  <EditLesson key={item._id || item.id}
                    content={item.content}
                    name={item.name}
                    status={item.status}
                    startTime={item.startTime}
                    endTime={item.endTime}
                    lessonId={item._id || item.id}
                    file={item.file}
                    seen={item.seen}
                    getData={getData} />
                )
              }

            </Stack>
            {role === 'teacher' &&
              <Stack>
                <CreateLesson getData={getData} />
              </Stack>
            }
          </Stack>
        </Paper>
      </Box>
    </Page>
  )
}

export default Lesson