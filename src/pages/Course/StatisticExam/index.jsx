import React, { useEffect, useState } from 'react'
import Page from 'components/Page'
import {
  Paper,
  Stack,
  Tab,
  Box,
  Tabs,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from 'components/AppWidgetSummary';

import TableStudent from './StatisticTable/TableStudent';
import TableTeacher from './StatisticTable/TableTeacher';
import { useSelector } from 'react-redux';
import apiStatistic from 'apis/apiStatistic';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import TableTeacherGroup from './StatisticTable/TableTeacherGroup';
import { PropTypes } from 'prop-types';
import TableQuestion from './StatisticTable/TableQuestion';
import BarChartPoint from './BarChartPoint';
import { useMutation } from 'react-query';

function StatisticExam(props) {
  const role = useSelector(state => state.setting.role)

  const [exams, setExams] = useState([])
  const [typeofPoint, setTypeofPoint] = useState('')
  const [viewPoint, setViewPoint] = useState('')
  const [maxPoints, setMaxPoints] = useState(0)
  const { slug } = useParams()//lấy slug exam
  const [tabIndex, setTabIndex] = React.useState(0);
  const [questions, setQuestions] = useState([])
  const [scoreDistribution, setScoreDistribution] = useState([])
  const handleChangeTabIndex = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  const { mutate } = useMutation(() => apiStatistic.getStatisticExam({ examSlug: slug }, role),
    {
      onSuccess(data) {
        if (data) {
          let maxPoints = data.maxPoints
          if (Array.isArray(data?.takeExams)) {
            let newArr = data?.takeExams.map(item => ({
              ...item,
              points10: (item.points * 10 / maxPoints),
              maxPoints
            }))
            setExams(newArr)
          }
          setTypeofPoint(data.typeofPoint)
          setViewPoint(data.viewPoint)
          setMaxPoints(10)
        }
      }
    })

  useEffect(() => {
    const getStatistic = () => {
      mutate();
    }

    const getQuestions = () => {
      apiStatistic.getDetailQuestionOfExam({ slug })
        .then(res => {
          if (Array.isArray(res.result)) {
            setQuestions(res.result)
          }
        })
    }
    const getScoreDistribution = () => {
      apiStatistic.getScoreDistributionOfExam({ slug })
        .then(res => {
          if (Array.isArray(res.labels)) {
            let arr = res.labels.map(e => {
              let points = ((e.points * 10) / res.maxPoints)
              return { ...e, points }
            })
            setScoreDistribution(arr)
          }
        })
    }
    getStatistic()
    getQuestions()
    getScoreDistribution()
  }, [slug])


  const count = exams.length
  const avgPoints = (count && exams.reduce((total, cur) => total + cur.points10, 0) / count).toFixed(2) || 0

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
      if (e.points / maxPoints >= 0.5)
        pass++

    })
    return (count && pass * 100 / count).toFixed(2) || 0
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
        {scoreDistribution.length !== 0 &&
          <BarChartPoint title='Phổ điểm'
            seriesData={scoreDistribution}
          />}


        <Paper elevation={12}>
          {role === 'student' ? <TableStudent exams={exams} maxPoints={maxPoints} viewPoint={viewPoint} typeofPoint={typeofPoint} /> :
            <>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleChangeTabIndex} centered>
                  <Tab label="Tất cả lượt thi" {...a11yProps(0)} />
                  <Tab label="Nhóm điểm theo học viên" {...a11yProps(1)} />
                  <Tab label="Tỉ lệ đúng" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={tabIndex} index={0}>
                <TableTeacher exams={exams} maxPoints={maxPoints} />
              </TabPanel>
              <TabPanel value={tabIndex} index={1}>
                <TableTeacherGroup exams={exams} maxPoints={maxPoints} typeofPoint={typeofPoint} />
              </TabPanel>
              <TabPanel value={tabIndex} index={2}>
                <TableQuestion questions={questions} />
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
