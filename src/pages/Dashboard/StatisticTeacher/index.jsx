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


export default StatisticExam
