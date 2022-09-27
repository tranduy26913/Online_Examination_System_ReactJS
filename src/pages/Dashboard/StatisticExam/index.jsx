import React from 'react'
import Page from 'components/Page'
import {
  Paper,
  Stack,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from 'components/AppWidgetSummary';
import PieChartPoint from './PieChartPoint';
import TableStudent from './TableStudent';

function StatisticExam(props) {
  return (
    <Page title='Thống kê bài thi'>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số lượt làm bài" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Kết quả trung bình" total={9.2} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>

        
          <Grid container spacing={2}>
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
          </Grid>

          <Paper>
            <TableStudent/>
          </Paper>
        
      </Stack>
    </Page>
  )
}

StatisticExam.propTypes = {}

export default StatisticExam
