import { useState } from 'react'
import {
    Paper,
    Stack,
    Avatar,
    Button,
    Box,
    TextField,
    Typography,
    Divider,
    ListItemText,
    FormControl,
    RadioGroup,
    Radio,
    FormControlLabel,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import UploadIcon from '@mui/icons-material/Upload';
import avtDefault from 'assets/img/avatar.jpg'
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import slugify from 'slugify'
import apiCourse from 'apis/apiCourse';
import { toast } from 'react-toastify';
import LoadingButton from 'components/LoadingButton'
import Page from 'components/Page'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'

const alpha = [...Array.from(Array(26)).map((e, i) => i + 65),
...Array.from(Array(26)).map((e, i) => i + 97),
...Array.from(Array(10)).map((e, i) => i + 48)];
const alphabet = alpha.map((x) => String.fromCharCode(x));

function CreateCourse(props) {
    const [image, setImage] = useState(avtDefault)
    const [fileImage, setFileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [startTime, setStartTime] = useState( moment(new Date()))
    const [endTime, setEndTime] = useState(moment(new Date()).add(60, 'days'))
    const [error, setError] = useState({isError:false,msg:""})
    const [updating, setUpdating] = useState(false);
    const user = useSelector(state => state.user.info) //lấy thông tin user
    const navigate = useNavigate()

    const checkTime = (start, end)=>{
        let isError = false
        let msg = ""
        if (start&& end) {
            if (start.isValid() && end.isValid()) {
                if (end < start) {
                    isError = true
                    msg = "Ngày kết thúc phải sau ngày bắt đầu"
                }
                else {
                    if (Math.abs(end.diff(start, 'days')) < 7) {
                        isError = true
                        msg = "Khoá học phải kéo dài ít nhất 7 ngày"
                    }
                    else {
                        isError = false
                    }
                }
            }
        }
        else{
            isError = true
            msg = "Vui lòng nhập đầy đủ thông tin"
        }
        setError({isError,msg})
    }
    const handleStartTime = (newValue) => {
        setStartTime(newValue)
        checkTime(newValue,endTime)
    }
    const handleEndTime = (newValue) => {
        setEndTime(newValue)
        checkTime(startTime,newValue)
    }

    const handleChooseImage = e => {
        if (e.target.files.lenght !== 0) {
            setFileImage(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        }
        console.log(fileImage)
    }
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: ""
        }
    });


    const onSubmit = (data) => {
        const { name, description } = data
        let random = ''
        for (let i = 0; i < 7; i++) {
            random += alphabet[Math.floor(Math.random() * alphabet.length)]
        }
        const slug = slugify(data.name, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',       // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        }) + '-' + random

        if (error.isError) {
            return
        }

        const params = {
            slug,
            name,
            description,
            username: user.username,
            file: fileImage,
            startTime:startTime.toDate(),
            endTime:endTime.toDate(),
        }
        setLoading(true)
        apiCourse.createCourse(params)
            .then(res => {
                navigate(`/course/${res.courseId}`)
                toast.success('Tạo khoá học thành công')
            })
            .catch(err => {
                toast.error('Tạo khoá học thất bại')
            })
            .finally(() => setLoading(false))
    }

    return (
        <Page title='Tạo khoá học mới'>

            <Stack direction='row' spacing={2}>
                <Box flex={2}>
                    <Paper elevation={24} sx={{ height: '100%' }}>
                        <Stack py={8} alignItems='center' justifyContent={'center'} gap='16px'>
                            <Avatar
                                variant="rounded"
                                alt="Remy Sharp"
                                src={"https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg"}
                                sx={{ width: 250, height: 250 }}
                            />
                            <Button variant='contained' component="label" width='160px'
                                endIcon={<UploadIcon />}
                            >
                                Tải ảnh lên
                                <input hidden accept="image/*" type="file" onChange={handleChooseImage} />
                            </Button>
                        </Stack>
                    </Paper>
                </Box>
                <Box flex={3}>
                    <Paper elevation={24} sx={{ height: '100%' }}>
                        <Stack spacing={1.5} p={1.5}>
                            <Typography align='center' color='primary' fontSize='1.75rem' mb={2}>
                                Thông tin khoá học
                            </Typography>
                            <Divider />
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <Stack spacing={2.5}>
                                    <Controller
                                        name={"name"}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                color='success'
                                                size='small'
                                                type='text'
                                                label="Tên khoá học"
                                                error={error !== undefined}
                                                helperText={error ? error.message : ''}
                                                //sx={{ backgroundColor: "#fff" }}
                                                variant="outlined" />
                                        )}
                                    />

                                    <Controller
                                        name={"description"}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <TextField
                                                {...field}
                                                color='success'
                                                size='small'
                                                type='text'
                                                label="Mô tả khoá học"
                                                error={error !== undefined}
                                                helperText={error ? error.message : ''}
                                                //sx={{ backgroundColor: "#fff" }}
                                                multiline
                                                rows={5}
                                                variant="outlined" />
                                        )}
                                    />
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            inputFormat="DD/MM/YYYY"
                                            label="Ngày bắt đầu"
                                            value={startTime}
                                            onChange={handleStartTime}
                                            renderInput={(params) => <TextField {...params}
                                                error={params.error || error.isError}
                                                helperText={params.error&&"Ngày không hợp lệ"}
                                                size='small' fullWidth />
                                            }
                                        />
                                    </LocalizationProvider>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            inputFormat="DD/MM/YYYY"
                                            label="Ngày kết thúc"
                                            value={endTime}
                                            onChange={handleEndTime}
                                            renderInput={(params) =>
                                                <TextField
                                                 {...params} 
                                                 error={params.error || error.isError}
                                                 helperText={params.error?"Ngày không hợp lệ":
                                                 error.isError&&error.msg}
                                                 size='small' fullWidth />
                                            }
                                        />
                                    </LocalizationProvider>
                                    <Stack alignItems='center'>

                                        <LoadingButton
                                            onClick={handleSubmit(onSubmit)}
                                            loading={loading}
                                            variant="contained"
                                        >
                                            Tạo khoá học
                                        </LoadingButton>
                                    </Stack>
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Page>

    )
}

CreateCourse.propTypes = {}

export default CreateCourse
