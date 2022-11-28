import { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    Paper,
    TextField,
} from "@mui/material"
import Page from 'components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCourse from 'apis/apiCourse';
import { Player } from '@lottiefiles/react-lottie-player';
import { getMessageError } from 'utils';
import LoadingButton from 'components/LoadingButton';
const EnrollCourse = () => {
    const { courseId } = useParams()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const getInfo = () => {
            apiCourse.getCourseToEnroll({ courseId })
                .then(res => {
                    setName(res.name)
                })
                .catch(err => {
                    toast.warning(getMessageError(err))
                })
        }
        getInfo()
    }, [courseId])

    const handleSubmit = () => {
        setLoading(true)
        apiCourse.EnrollIntoCourse({
           courseId,
           pin
        })
            .then(res => {
                toast.success("Tham gia khoá học thành công")
                navigate('/course/' + courseId)
            })
            .finally(()=>setLoading(false))
    }


    return (
        <Page title={name}>
            <Stack width='100%' height='100vh' justifyContent='center' alignItems='center'>
                <Box width='100%' maxWidth='500px'>

                    <Paper>
                        <Stack p={2} spacing={2} alignItems='center'>
                            <Typography fontSize='18px' color='primary' align='center'>Nhập mật khẩu tham gia khoá học</Typography>
                            <Typography fontSize='18px'>
                              Khoá học: {name}
                                </Typography>
                            
                            <Stack justifyContent={'center'} alignItems='center'>
                                 <Player
                                autoplay
                                loop
                                src="https://assets6.lottiefiles.com/private_files/lf30_BfKkV9.json"
                                style={{ width: '70%' }}
                            />
                            </Stack>
                           
                            <TextField
                                fullWidth
                                value={pin}
                                placeholder='Nhập mật khẩu tham gia khoá học'
                                onChange={e => setPin(e.target.value)}
                                variant='standard' />
                            <LoadingButton loading={loading}
                             variant='contained' onClick={handleSubmit}>
                                Tham gia khoá học</LoadingButton>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Page>
    )
}


export default EnrollCourse