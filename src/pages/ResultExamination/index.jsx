import { Button, Divider, Paper ,Typography} from '@mui/material'
import { Stack } from '@mui/system'
import {Link} from "react-router-dom"
import Page from 'components/Page'
import React from 'react'
function ResultExamination() {
    return (
        <Page title='Kết quả bài thi'>
            <Stack width='100%' height='100vh' justifyContent={'center'} alignItems='center'>

                <Paper elevation={12} sx={{ width: '100%', maxWidth: '500px' }}>
                    <Stack p={2} spacing={1}>
                        <Typography variant='h4' color='primary' align='center'>Kết quả bài thi</Typography>
                        <Divider/>
                        <Typography>Bài thi của bạn đã được hệ thống ghi nhận</Typography>
                        <Typography>Điểm: <strong>10/10</strong></Typography>
                        <Typography>Lần thi: <strong>2</strong></Typography>
                        <Stack direction='row' justifyContent='center' spacing={2}>
                            <Button variant='contained'>Xem đáp án</Button>
                            <Link to='/course'>
                            <Button variant='contained'>Xem thống kê</Button>
                            </Link> 
                            </Stack>
                    </Stack>
                </Paper>

            </Stack>
        </Page>
    )
}

export default ResultExamination