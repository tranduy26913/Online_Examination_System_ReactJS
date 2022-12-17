import React, { useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Paper,
  Stack,
  Tab,
  Box,
  Tabs,
  Typography,
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
import TableTeacherGroup from './StatisticTable/TableTeacherGroup';
import { PropTypes } from 'prop-types';

function StatisticExam(props) {
  const role = useSelector(state => state.setting.role)

  const [exams, setExams] = useState([])
  const [typeofPoint, setTypeofPoint] = useState('')
  const { slug } = useParams()//lấy slug exam
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTabIndex = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => {
    const getStatistic = () => {
      const params = { examSlug: slug }
      let response = apiStatistic.getStatisticExamByStudent(params)
      if (role === 'teacher')
        response = apiStatistic.getStatisticExamByTeacher(params)

      response.then(res => {
        setExams(res?.takeExams)
        setTypeofPoint(res.typeofPoint)
      })
    }
    getStatistic()
  }, [role, slug])

  const count = exams.length
  const avgPoints = (count && exams.reduce((total, cur) => total + cur.points, 0) / count).toFixed(2) || 0
  const maxPoints = (count && exams[0].maxPoints) || null
  const avgDuration = (() => {
    let duration = 0
    exams.forEach(e => {
      duration += moment(e.submitTime).diff(e.startTime, 'minutes')
    })
    return (count && duration / count).toFixed(2) || 0
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
            <AppWidgetSummary title="Số lượt làm bài" total={exams.length} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Kết quả trung bình" text={`${avgPoints}${maxPoints ? `/${maxPoints}` : ''}`} total={`${avgPoints}${maxPoints ? `/${maxPoints}` : ''}`} color="info" />
          </Grid>


          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Thời lượng trung bình" total={avgDuration} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng kết" text={`Đạt ${summary}%`} total={234} color="error" />
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

        <Paper elevation={12}>
          {role === 'student' ? <TableStudent exams={exams} /> :
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChangeTabIndex} centered>
                  <Tab label="Tất cả lượt thi" {...a11yProps(0)} />
                  <Tab label="Nhóm điểm theo học viên" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tabIndex} index={0}>
                <TableTeacher exams={exams} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <TableTeacherGroup exams={exams} typeofPoint={typeofPoint}/>
              </TabPanel>

            </>
          }
        </Paper>

      </Stack>
    </Page>
  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default StatisticExam
