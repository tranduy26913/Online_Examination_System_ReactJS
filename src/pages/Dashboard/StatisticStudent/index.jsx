import React, {  useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import SchoolIcon from '@mui/icons-material/School'
import AppWidgetSummary from 'components/AppWidgetSummary';
//import PieChartPoint from './PieChartPoint';
import apiStatistic from 'apis/apiStatistic';

function StatisticExam(props) {

  const [noCoursesJoined, setNoCoursesJoined] = useState(0)
  const [noAssignmentsSubmitted, setNoAssignmentsSubmitted] = useState(0)
  const [noExamsTaken, setNoExamsTaken] = useState(0)
  useEffect(() => {
    const getData = async () => {
      apiStatistic.getDetailOfStudent()
        .then(res => {
          setNoCoursesJoined(res?.numberOfCoursesJoined)
          setNoExamsTaken(res?.numberOfExamsTaken)
          setNoAssignmentsSubmitted(res?.numberOfAssignmentsSubmitted)
        })

    }
    getData()
  }, [])

  return (
    <Page title='Thống kê'>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số khoá học tham gia" total={noCoursesJoined} Icon={SchoolIcon} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số lượt thi" total={noExamsTaken} color="info" Icon={TipsAndUpdatesIcon}/>
          </Grid>


          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Số lượt nộp bài" total={noAssignmentsSubmitted} color="warning"  Icon={AssignmentTurnedInIcon}/>
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
