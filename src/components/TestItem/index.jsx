import React from 'react'
import {
    Button,
    Stack,
    Typography,
    Divider
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import SendIcon from '@mui/icons-material/Send';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled,useTheme } from '@mui/material/styles';
const StackContainer =styled(Stack)(({ theme })=>( {
    borderRadius:'8px',
    border:'1px dotted #000',
    borderColor:theme.palette.primary.main
}))

const TestItem = (props) =>{
    const theme = useTheme()
    const {data} = props
  return (
    <StackContainer className ='testItem' direction='row' justifyContent={'space-between'} p={1}>
        <Stack flex={1}>
            <Typography fontSize="16px" >{data.name}</Typography>
            <Divider sx={{backgroundColor:theme.palette.primary.light}} />
            <Grid container mt={1}>
                <Grid xs={12} md={6} lg={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Typography fontSize="15px" fontWeight="600">Thời gian bắt đầu:</Typography>
                        <Typography fontSize="14px">{data.start && data.start.toLocaleString()}</Typography>
                    </Stack>
                </Grid>
                <Grid xs={12} md={6} lg={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Typography fontSize="15px" fontWeight="600">Thời lượng làm bài:</Typography>
                        <Typography fontSize="14px">{data.duration || 0} phút</Typography>
                    </Stack>
                </Grid>
                <Grid xs={12} md={6} lg={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Typography fontSize="15px" fontWeight="600">Số câu hỏi:</Typography>
                        <Typography fontSize="14px">{data.numberQuestion || 0}</Typography>
                    </Stack>
                </Grid>
                <Grid xs={12} md={6} lg={3}>
                    <Stack alignItems='center' spacing={1}>
                        <Typography fontSize="15px" fontWeight="600">Thời gian bắt đầu:</Typography>
                        <Typography fontSize="14px">{data.turns || 0 }</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
        <Stack>
            <Button 
                startIcon={<SendIcon/>}
            >Chia sẻ</Button>
            <Button 
                startIcon={<AssignmentIcon/>}
            >Làm bài</Button>
            <Button 
                startIcon={<BarChartIcon/>}
            >Thống kê</Button>
        </Stack>


    </StackContainer>
  )
}

export default TestItem