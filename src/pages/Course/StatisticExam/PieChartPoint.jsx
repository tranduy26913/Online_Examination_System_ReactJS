import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from 'utils/formatNumber';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
//   '& .apexcharts-legend': {
//     height: LEGEND_HEIGHT,
//     alignContent: 'center',
//     position: 'relative !important',
//     borderTop: `solid 1px ${theme.palette.divider}`,
//     top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
//   },
}));

// ----------------------------------------------------------------------

PieChartPoint.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function PieChartPoint({ title, subheader, chartColors, chartData, ...other }) {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions =  {
    //colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    height:'70%',
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={chartSeries} options={chartOptions} 
        height={280}
         />
      </ChartWrapperStyle>
    </Card>
  );
}
