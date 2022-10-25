import { Stack, Typography } from '@mui/material';
import Page from 'components/Page';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function ResultPayment() {
    const navigate = useNavigate()
    const [count, setCount] = useState(5) //xử lý đếm ngược
    const query = useSearchParams()[0]
    const message =  query.get('message') ||query.get('vnp_ResponseCode') === '00'?"Giao dịch thành công":"Giao dịch không thành công"

    useEffect(() => {
        const countDown = () => {//hàm xử lý đếm ngược 5s sau khi kích hoạt xong
            setTimeout(() => {
                if (count > 0) {
                    setCount(pre => pre - 1)
                }
                else {
                    navigate(`/my/profile`)
                }
            }, 1000)
        }
        countDown();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])


    return (
        <Page title="Kết quả giao dịch">
            <Stack height="400px" justifyContent={'center'} alignItems='center'>
                <Stack alignItems='center' spacing={2}>
                    <Typography>{message}</Typography>
                    <Link to={`/my/profile`}>Chuyển đến thông tin cá nhân trong {count} giây</Link>
                </Stack>
            </Stack>
        </Page>
    )
}


export default ResultPayment