import React, { useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Paper,
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from 'components/AppWidgetSummary';
//import PieChartPoint from './PieChartPoint';
import TableStudent from './StatisticTable/TableStudent';
import TableTeacher from './StatisticTable/TableTeacher';
import { useSelector } from 'react-redux';
import apiStatistic from 'apis/apiStatistic';
import { useParams } from 'react-router-dom';
import moment from 'moment';

function StatisticExam(props) {
  const role = useSelector(state => state.setting.role)
 
  const [exams, setExams] = useState([])
  const { slug } = useParams()//lấy slug exam
  useEffect(() => {
    const getStatistic = () => {
      const params = { examSlug: slug }
      let response = apiStatistic.getStatisticExamByStudent(params)
      if(role === 'teacher')
      response = apiStatistic.getStatisticExamByTeacher(params)
     
      response.then(res => {
          setExams(res)
        })
    }
    getStatistic()
  }, [role, slug])

  const count = exams.length
  const avgPoints = (count && exams.reduce((total, cur) => total + cur.points, 0) / count) || 0
  const maxPoints = (count && exams[0].maxPoints) || null
  const avgDuration = (() => {
    let duration = 0
    exams.forEach(e => {
      duration += moment(e.submitTime).diff(e.startTime, 'minutes')
    })
    return (count && duration / count) || 0
  })()

  const summary = (() => {
    let pass = 0
    exams.forEach(e => {
      if (e.points / e.maxPoints >= 5)
        pass++

    })
    return (count && pass / count) || 0
  })()

  return (
    <Page title='Thống kê bài thi'>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số lượt làm bài" total={exams.length} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Kết quả trung bình" text={`${avgPoints}${maxPoints ? `/${maxPoints}` : ''}`} total={`${avgPoints}${maxPoints ? `/${maxPoints}` : ''}`} color="info" icon={'ant-design:apple-filled'} />
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Thời lượng trung bình" total={avgDuration} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng kết" text={`Đạt ${summary}%`} total={234} color="error" icon={'ant-design:bug-filled'} />
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

        <Paper>
          {role === 'student' ? <TableStudent exams={exams} /> : <TableTeacher exams={exams} />}
        </Paper>

      </Stack>
    </Page>
  )
}

StatisticExam.propTypes = {}

export default StatisticExam
