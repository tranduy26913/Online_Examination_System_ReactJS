import React from 'react'
import { Stack, Box, styled, Typography } from '@mui/material'
import './LoadingPage.scss'

const Roller = styled(Box)(({ theme }) => ({
    '&:before,&:last-child:before': {
        content: '""',
        display: 'block',
        width: '15px',
        height: '15px',
        background: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
        borderRadius: '50%',
    }
}))

function LoadingRoller(props) {
    return (
        <Stack
        sx={{position:'relative'}}
         width='100%' minWidth='500px' height='100%' minHeight='200px' justifyContent='center' alignItems='center'>
                <div className="loader-wrapper">
                    <div className="loader">
                        <Roller className="roller"></Roller>
                        <Roller className="roller"></Roller>
                    </div>

                    <div id="loader2" className="loader">
                        <Roller className="roller"></Roller>
                        <Roller className="roller"></Roller>
                    </div>

                    <div id="loader3" className="loader">
                        <Roller className="roller"></Roller>
                        <Roller className="roller"></Roller>
                    </div>

                </div>
                    <Typography align='center'>{props.content || 'Đang tải dữ liệu...'}</Typography>
        
        </Stack>
    )
}

export default LoadingRoller