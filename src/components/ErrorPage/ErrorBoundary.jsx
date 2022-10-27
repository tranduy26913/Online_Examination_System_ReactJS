import React from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import Page from 'components/Page'
import { Link } from 'react-router-dom'
import imageErr from 'assets/img/error.png'
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (!this.state.hasError)
            return this.props.children;
        else
            return (
                <Page title='Đường dẫn không tồn tại'>
                    <Stack>
                        <Stack alignSelf='center' flex={1}>
                            <img src={imageErr} width='380px'></img>
                        </Stack>
                        <Stack alignSelf='center' flex={1} spacing={2}>
                            {/* <Typography component={'h1'} fontSize='60px' fontWeight={600}>404</Typography> */}
                            <h2>UH OH! Có lỗi xảy ra!</h2>
                            <Typography>Vui lòng thử tải lại trang hoặc liên hệ quản trị viên nếu lỗi vẫn chưa được khắc phục
                            </Typography>
                            <Stack direction='row' justifyContent='center' spacing={2}>
                                <Button sx={{width:'130px'}} variant='contained' onClick={()=>window.location.reload()}>Tải lại</Button>
                                <Button sx={{width:'130px'}} variant='contained' onClick={()=>window.location.href='/'}>Về trang chủ</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </Page>)
    }
}

export default ErrorBoundary