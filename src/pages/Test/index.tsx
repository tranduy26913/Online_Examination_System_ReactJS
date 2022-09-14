import React from 'react'
import {
    Box,
    Button,
    Stack,
    Typography,
    Divider
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { styled, useTheme } from '@mui/material/styles';
import Question from './Question';
import { IQuestion } from '../../interfaces'
import { fontSize } from '@mui/system';
const ButtonQuestion = styled(Button)(({ theme }) => ({
    borderRadius: '50%',
    //padding:'8px',
    width: '100%',
    minWidth: 'unset',
    minHeight: 'unset',
    //paddingBottom:'50%',
    color: '#333',
    border: '2px solid #999',
    '&.done': {
        borderColor: `${theme.palette.primary.main}cc`,
        backgroundColor: `${theme.palette.primary.light}40`
    }
}));
const BoxTime = styled(Box)(({theme})=>({
    borderRadius: '2px',
    color:theme.palette.primary.main,
    fontWeight:600,
    border: `1px solid ${theme.palette.primary.main}`,
    padding:'0.5rem 1rem',
    position:'fixed',
    right:'2rem',
    bottom:'2rem',
  fontSize:'16px',
  }))
const TestItem: React.FC = () => {
    const theme = useTheme()
    document.title = "Bài kiểm tra số 1"
    return (
        <Box className='container' py={2}>
            <Box>
                <Typography
                    sx={{
                        fontSize: '20px',
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mb: 2,
                        textAlign: 'center'
                    }}>Bài kiểm tra số 1</Typography>
                <Stack direction='row' spacing={1.5}>

                    <Stack flex={4} spacing={3}>
                        {
                            questions.map(item =>
                                <Question key={item.id} question={item} />)
                        }
                    </Stack>
                    <Stack flex={1} spacing={1}>
                        <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                        <Grid container spacing={0.5}>
                            {

                                questions.map((item) =>
                                    <Grid xs={2}>
                                        <ButtonQuestion className='done'>{item.index}</ButtonQuestion>
                                    </Grid>)
                            }
                        </Grid>
                    </Stack>
                </Stack>
            </Box>
<BoxTime>
    01:00:00
</BoxTime>
        </Box>
    )
}
const questions: IQuestion[] = [
    {
        id: '1',
        index: 1,
        question: 'Câu hỏi số 1',
        answers: [
            {
                id:'1',
                value:'Concacne'
            },
            {
                id:'2',
                value:'Concacne'
            },
            {
                id:'3',
                value:'Concacne'
            },
            {
                id:'4',
                value:'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: false,
    },
    {
        id: '1342',
        index: 2,
        question: 'Câu hỏi số 2',
        answers: [
            {
                id:'1',
                value:'Concacne'
            },
            {
                id:'2',
                value:'Concacne'
            },
            {
                id:'3',
                value:'Concacne'
            },
            {
                id:'4',
                value:'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: true,
    },
    {
        id: '1er',
        index: 3,
        question: 'Câu hỏi số 3',
        answers: [
            {
                id:'1',
                value:'Concacne'
            },
            {
                id:'2',
                value:'Concacne'
            },
            {
                id:'3',
                value:'Concacne'
            },
            {
                id:'4',
                value:'Concacne'
            },
        ],
        point: 1.00,
        flag: false,
        isChoose: true,
    }
]
export default TestItem