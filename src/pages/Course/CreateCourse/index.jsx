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
    Radio,
    FormControlLabel,
    RadioGroup,
    FormLabel,
    FormControl,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import UploadIcon from '@mui/icons-material/Upload';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import slugify from 'slugify'
import apiCourse from 'apis/apiCourse';
import { toast } from 'react-toastify';
import LoadingButton from 'components/LoadingButton'
import Page from 'components/Page'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import { useEffect } from 'react';
import { getMessageError } from 'utils';
import { IOSSwitch } from 'pages/Dashboard/CreateExamination/Component/MUI';

const alpha = [...Array.from(Array(26)).map((e, i) => i + 65),
...Array.from(Array(26)).map((e, i) => i + 97),
...Array.from(Array(10)).map((e, i) => i + 48)];
const alphabet = alpha.map((x) => String.fromCharCode(x));

function CreateCourse(props) {
    const { isEdit } = props
    const [image, setImage] = useState('https://prod-discovery.edx-cdn.org/media/course/image/156313d6-f892-4b08-9cee-43ea582f4dfb-7b98c686abcc.small.png')
    const [fileImage, setFileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [startTime, setStartTime] = useState(moment(new Date()))
    const [endTime, setEndTime] = useState(moment(new Date()).add(60, 'days'))
    const [error, setError] = useState({ isError: false, msg: "" })
    const [certification, setCertification] = useState('not allow');

    const handleChange = (event) => {
        setCertification(event.target.value);
    };
    const user = useSelector(state => state.user.info) //lấy thông tin user
    const role = useSelector(state => state.setting.role) //lấy thông tin role
    const { courseId } = useParams()
    const navigate = useNavigate()

    const { handleSubmit, setValue, control, watch } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            description: "",
            price: 0
        }
    });
    const isSell = watch("isSell", false)
    const price = watch("price", 0)

    const checkTime = (start, end) => {
        let isError = false
        let msg = ""
        if (start && end) {
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
        else {
            isError = true
            msg = "Vui lòng nhập đầy đủ thông tin"
        }
        setError({ isError, msg })
    }
    const handleStartTime = (newValue) => {
        setStartTime(newValue)
        checkTime(newValue, endTime)
    }
    const handleEndTime = (newValue) => {
        setEndTime(newValue)
        checkTime(startTime, newValue)
    }

    const handleChooseImage = e => {
        if (e.target.files.lenght !== 0) {
            setFileImage(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleCreate = (data) => {
        const { name, description, pin, status, price } = data
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
            pin,
            price,
            certification,
            status,
            username: user.username,
            file: fileImage,
            startTime: startTime.toDate(),
            endTime: endTime.toDate(),
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

    const handleUpdate = (data) => {
        let { name, description, pin, isSell, price } = data
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
        if (!isSell) {
            price = 0
        }
        const params = {
            slug,
            courseId,
            name,
            description,
            certification,
            pin,
            price,
            file: fileImage,
            startTime: startTime.toDate(),
            endTime: endTime.toDate(),
        }
        setLoading(true)
        apiCourse.updateCourse(params)
            .then(res => {
                navigate(`/course/${res.courseId}`)
                toast.success(res.message)
            })
            .catch(err => {
                toast.error(getMessageError(err))
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        const getCourse = () => {
            apiCourse.getCourseByCourseID({ courseId }, role)
                .then(res => {
                    setValue('name', res.name)
                    setValue('description', res.description)
                    setValue('pin', res.pin)

                    setValue('isSell', res.price > 0)
                    setValue('price', res.price)
                    setImage(res.image)
                    setStartTime(moment(res.startTime))
                    setEndTime(moment(res.endTime))
                    setCertification(res.certification)
                })
        }
        getCourse()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId])

    return (
        <Page title='Tạo khoá học mới'>

            <Stack direction='row' spacing={2}>
                <Box flex={2}>
                    <Paper elevation={24} sx={{ height: '100%' }}>
                        <Stack py={8} px={2} alignItems='center' justifyContent={'center'} gap='16px'>
                            <Avatar
                                variant="rounded"
                                alt="Remy Sharp"
                                src={image}
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

                            <Stack spacing={2.5}>
                                <Controller
                                    name={"name"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
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
                                <Stack direction={'row'} spacing={2} alignItems='center'>
                                    <label>Bán khoá học</label>
                                    <Controller
                                        name={"isSell"}
                                        control={control}
                                        render={({ field, fieldState: { error } }) => (
                                            <IOSSwitch checked={field.value} onChange={field.onChange} />
                                        )}
                                    />
                                </Stack>
                                <Controller
                                    name={"price"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            size='small'
                                            type="text"
                                            sx={!isSell && { display: 'none' }}
                                            label="Giá khoá học"
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                            variant="outlined" />
                                    )}
                                />

                                <Controller
                                    name={"pin"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <TextField
                                            {...field}
                                            size='small'
                                            type='text'
                                            sx={isSell && { display: 'none' }}
                                            label="Mật khẩu tham gia"
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                            variant="outlined" />
                                    )}
                                />

                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Cấp chứng chỉ</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={certification}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="not allow" control={<Radio />} label="Không cấp" />
                                        <FormControlLabel value="when done" control={<Radio />} label="Khi hoàn thành khoá học" />
                                        <FormControlLabel value="when course done" control={<Radio />} label="Khi khoá học kết thúc" />
                                    </RadioGroup>
                                </FormControl>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DesktopDatePicker
                                        inputFormat="DD/MM/YYYY"
                                        label="Ngày bắt đầu"
                                        value={startTime}
                                        onChange={handleStartTime}
                                        renderInput={(params) => <TextField {...params}
                                            error={params.error || error.isError}
                                            helperText={params.error && "Ngày không hợp lệ"}
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
                                                helperText={params.error ? "Ngày không hợp lệ" :
                                                    error.isError && error.msg}
                                                size='small' fullWidth />
                                        }
                                    />
                                </LocalizationProvider>

                                {/* <Controller
                                    name={"status"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <FormControlLabel label="Công khai"
                                        labelPlacement="start"
                                        sx={{alignSelf:'flex-start'}}
                                            control={<Switch {...field}/>} />
                                    )}
                                /> */}
                                <Stack alignItems='center'>

                                    <LoadingButton
                                        onClick={isEdit ? handleSubmit(handleUpdate) : handleSubmit(handleCreate)}
                                        loading={loading}
                                        variant="contained"
                                    >
                                        {isEdit ? 'Cập nhật' : 'Tạo khoá học'}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Paper>
                </Box>
            </Stack>
        </Page>

    )
}

CreateCourse.propTypes = {}

export default CreateCourse
