import React, { useContext, useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Paper,
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import SchoolIcon from '@mui/icons-material/School'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AppWidgetSummary from 'components/AppWidgetSummary';
//import PieChartPoint from './PieChartPoint';
import apiStatistic from 'apis/apiStatistic';
import CourseContext from '../LayoutCourse/CourseContext';

function StatisticExam(props) {
  const { courseId } = useContext(CourseContext)

  const [noStudents, setNoStudents] = useState(0)
  const [noExams, setNoExams] = useState(0)
  const [noAssignments, setNoAssignments] = useState(0)
  const [noTakeExams, setNoTakeExams] = useState(0)
  useEffect(() => {
    const getData = async () => {
      apiStatistic.getDetailOfCourse({ courseId })
        .then(res => {
          setNoTakeExams(res?.countTakeExams)
          setNoExams(res?.countExams)
          setNoAssignments(res?.countAssignments)
          setNoStudents(res?.countStudents)
        })

    }
    getData()
  }, [])

  return (
    <Page title='Thống kê khoá học'>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số học viên" total={noStudents} Icon={SchoolIcon} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số bài thi" total={noExams} color="info" Icon={TipsAndUpdatesIcon}/>
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Lượt làm bài thi" total={noTakeExams} color="warning" Icon={ListAltIcon}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số bài tập" total={noAssignments} color="error" Icon={AssignmentTurnedInIcon}/>
          </Grid>
        </Grid>


        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper>
              <PieChartPoint
                chartData={[
                  { label: '0-2', value: 4344 },
                  { label: '2-4', value: 5435 },
                  { label: '4-6', value: 1443 },
                  { label: '6-8', value: 4443 },
                  { label: '8-10', value: 4443 },
                ]}
              /></Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
              <PieChartPoint
                chartData={[
                  { label: 'America', value: 4344 },
                  { label: 'Asia', value: 5435 },
                  { label: 'Europe', value: 1443 },
                  { label: 'Africa', value: 4443 },
                ]}
              /></Paper>
          </Grid>
        </Grid> */}



      </Stack>
    </Page>
  )
}

StatisticExam.propTypes = {}

export default StatisticExam
