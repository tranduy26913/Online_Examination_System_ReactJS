import React from 'react'
import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import SendIcon from '@mui/icons-material/Send';
import { ITestItem } from '../../../interfaces'
import './ListTest.scss'
import TestItem from 'components/TestItem';
const ListTest: React.FC = () => {
    document.title = "Danh sách bài kiểm tra"
    return (
        <Box className='listtest'>
            <Stack direction='row' className='listtest__course'>
                <Box className='listtest__wrap-img'>
                    <img src="https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg" />
                </Box>
                <Stack spacing={1} className='listtest__wrap-info'>
                    <Typography
                        fontSize={'18px'}
                        color='primary'
                        className='listtest__course-name'>Khoá học: Học máy </Typography>
                    <Typography className='listtest__course-desc'>Cuộc thi học thuật trực tuyến </Typography>
                    <Typography className='listtest__course-desc'>Số lượng bài kiểm tra: 8</Typography>
                    <Stack flex={1} justifyContent='flex-end' alignItems='flex-start'>
                        <Button
                            variant='outlined'
                            endIcon={<SendIcon />}
                        >Chia sẻ</Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack spacing={1}>
                {
                    tests.map(item =>
                        <TestItem data={item} />
                    )
                }
            </Stack>
        </Box>
    )
}

const tests: ITestItem[] = [
    {
        name: "Bài kiểm tra số 1",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 2",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    }
]

export default ListTest