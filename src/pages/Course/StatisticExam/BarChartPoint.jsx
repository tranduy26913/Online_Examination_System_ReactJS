import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils

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

BarChartPoint.propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    chartColors: PropTypes.arrayOf(PropTypes.string),
    chartData: PropTypes.array,
};

export default function BarChartPoint({ title = 'Biểu đồ doanh thu theo ngày'
    , subheader, seriesData, chartColors, chartData, ...other }) {
    const theme = useTheme();

    const makeLabels = (seriesData) => {
        if (seriesData.length === 0)
            seriesData = Array.from(Array(10).keys()).map((item) => ({
                labels: item,
                freq: 0
            }))
        const series = [{
            name: 'Số lượng',
            type: 'column',
            data: seriesData.map(e => e.freq)
        },]

        const labels = seriesData.map(e => e.points)
        return {series,labels}
    }

    const {series,labels} = makeLabels(seriesData)
    const chartOptions = {
        //colors: chartColors,
        labels: labels,
        stroke: { width: [0, 2] },
        //legend: { floating: true, horizontalAlign: 'center' },
        title: {
            text: title,
            align: 'center'
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
        },
        xaxis: {
            type: 'number'
        },
        height: '90%',
        yaxis: [{
            title: {
                text: 'Số lượng',
            },

        }]
    };

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <ChartWrapperStyle dir="ltr">
                <ReactApexChart type="bar" series={series} options={chartOptions}
                    height={340}
                />
            </ChartWrapperStyle>
        </Card>
    );
}
