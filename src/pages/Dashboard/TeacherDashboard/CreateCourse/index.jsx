import { useState } from 'react'
import {
    Paper,
    Stack,
    Avatar,
    Button,
    Box,
    TextField,
    Typography,
    Divider
} from '@mui/material'
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

const alpha = [...Array.from(Array(26)).map((e, i) => i + 65),
    ...Array.from(Array(26)).map((e, i) => i + 97),
    ...Array.from(Array(10)).map((e, i) => i + 48)];
const alphabet = alpha.map((x) => String.fromCharCode(x));

function CreateCourse(props) {
    const [image, setImage] = useState(avtDefault)
    const [fileImage, setFileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const user = useSelector(state=>state.auth.user) //lấy thông tin user
    const handleChooseImage = e => {
        console.log(e.target.files)
        if (e.target.files.lenght !== 0) {
            setFileImage(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }
    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange"
    });


    const onSubmit = (data) => {
        const image = 'https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg'
        console.log(fileImage)
        const { name, description } = data
        let random = ''
        for(let i=0;i<7;i++){
            random += alphabet[Math.floor(Math.random()*alphabet.length)]
        } 
        const slug = slugify(data.name, {
            replacement: '-',  // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true,      // convert to lower case, defaults to `false`
            strict: false,     // strip special characters except replacement, defaults to `false`
            locale: 'vi',       // language code of the locale to use
            trim: true         // trim leading and trailing replacement chars, defaults to `true`
        }) + random
        const params = {
            slug,
            name,
            description,
            image,
            idUser:user.id
        }
        setLoading(true)
        apiCourse.postCourse(params)
            .then(res => {
                toast.success('Tạo khoá học thành công')
            })
            .catch(err => {
                toast.error('Tạo khoá học thất bại')
            })
            .finally(setLoading(false))
    }

    return (
        <Page title='Tạo khoá học mới'>

        <Stack direction='row' spacing={2}>
            <Box flex={2}>
                <Paper elevation={24} sx={{ height: '100%' }}>
                    <Stack p={1.5} alignItems='center' justifyContent={'flex-start'} gap='16px'>

                        <Avatar
                            variant="rounded"
                            alt="Remy Sharp"
                            src={image}
                            sx={{ width: 156, height: 156 }}
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
                        <Divider/>
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
                                            label="Tên đăng nhập"
                                            error={error !== undefined}
                                            helperText={error ? error.message : ''}
                                            sx={{ backgroundColor: "#fff" }}
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
                                            sx={{ backgroundColor: "#fff" }}
                                            variant="outlined" />
                                    )}
                                />
                                <Stack alignItems='center'>

                                    <LoadingButton
                                        type='submit'
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
