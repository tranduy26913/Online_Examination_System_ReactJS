import {  useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Stack,
} from '@mui/material'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import SchoolIcon from '@mui/icons-material/School'
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from 'components/AppWidgetSummary';
//import PieChartPoint from './PieChartPoint';
import apiStatistic from 'apis/apiStatistic';

function StatisticExam(props) {

  const [noCoursesCreated, setNoCoursesCreated] = useState(0)
  const [noAssignmentsCreated, setNoAssignmentsCreated] = useState(0)
  const [noExamCreated, setNoExamCreated] = useState(0)
  useEffect(() => {
    const getData = async () => {
      apiStatistic.getDetailOfTeacher()
        .then(res => {
          setNoCoursesCreated(res?.numberOfCoursesCreated)
          setNoExamCreated(res?.numberOfExamCreated)
          setNoAssignmentsCreated(res?.numberOfAssignmentsCreated)
        })

    }
    getData()
  }, [])

  return (
    <Page title='Thống kê'>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số khoá học đã tạo" total={noCoursesCreated} Icon={SchoolIcon} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số bài thi đã tạo" total={noExamCreated} color="info" Icon={TipsAndUpdatesIcon}/>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số bài tập đã tạo" total={noAssignmentsCreated} color="warning" Icon={AssignmentTurnedInIcon}/>
          </Grid>
        </Grid>


      </Stack>
    </Page>
  )
}


export default StatisticExam
