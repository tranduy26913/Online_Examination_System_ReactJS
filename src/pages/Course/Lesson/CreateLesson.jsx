import { Box, Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Paper, Stack, Switch,Typography} from '@mui/material'
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import { Stack2Column, StackLabel } from 'pages/Dashboard/CreateExamination/Component/MUI';
import UploadIcon from '@mui/icons-material/Upload';
import apiLessons from 'apis/apiLessons';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import apiUpload from 'apis/apiUpload';
import { getMessageError } from 'utils';
function CreateLesson({ getData }) {
    const [content, setContent] = useState('')
    const [isAdd, setIsAdd] = useState(false)
    const [file, setFile] = useState('')
    const [isPublic, setIsPublic] = useState(true)
    const accessToken = useSelector(state => state.auth.accessToken)
    const [loading, setLoading] = useState(false)

    const { id: courseObjId } = useContext(CourseContext)

    const { handleSubmit, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            startTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            endTime: moment(new Date()).add(10, 'minutes').format("YYYY-MM-DDTHH:mm")
        }
    });

    const onClickAdd = () => {
        setIsAdd(true)
    }

    const hideEditor = () => setIsAdd(false)


    const createLesson = (data) => {
        const { name, startTime, endTime } = data
        const params = {
            courseId: courseObjId,
            name,
            content,
            file,
            startTime,
            endTime,
            status: isPublic ? 'public' : 'private'
        }
        setLoading(true)
        apiLessons.createLesson(params)
            .then(res => {
                toast.success("Thêm thành công")
                setIsAdd(false)
                getData()
            })
            .catch(err => {
                console.log(err)
                toast.warning(getMessageError(err) || "Thêm không thành công")
            })
            .finally(() => setLoading(false))
    }

    const handleChooseFile = (e) => {
        if (e.target.files.lenght !== 0) {
          const id = toast.loading("Đang tải lên")
          apiUpload.updateFileDeta({ upload: e.target.files[0] })
            .then(res => {
              setFile(res.url)
              toast.update(id, { render: "Tải lên thành công",isLoading:false, type:'success',autoClose: 1500 })
            })
            .catch(err => {
              toast.update(id, { render: "Tải lên không thành công",isLoading:false, type:'warning',autoClose: 1500 })
            })
        }
      }

    return (
        <Box spacing={2} mt={2}>
            {isAdd ?
            <Paper elevation={6}>
                <Stack spacing={2} p={2}>
                    <Typography align="center" fontSize="20px" color="primary">Thêm bài giảng</Typography>
                    <Stack2Column>

                        <StackLabel>
                            <Box>Tiêu đề nội dung</Box>
                            <FormControl>
                                <Controller
                                    name={"name"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input
                                                {...field}
                                            />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </StackLabel>
                        <StackLabel>
                            <Box>Hiện nội dung</Box>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Switch checked={isPublic}
                                        onChange={() => setIsPublic(!isPublic)} />} />
                            </FormGroup>
                        </StackLabel>
                    </Stack2Column>

                    <Stack2Column>
                        <StackLabel>
                            <Box>Thời gian bắt đầu</Box>
                            <FormControl>
                                <Controller
                                    name={"startTime"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input type='datetime-local'
                                                {...field}

                                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>


                        </StackLabel>
                        <StackLabel>
                            <Box>Thời gian kết thúc</Box>
                            <FormControl>
                                <Controller
                                    name={"endTime"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input type='datetime-local'
                                                {...field}
                                                min="1997-01-01T00:00" max="2030-12-31T00:00"
                                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </StackLabel>
                    </Stack2Column>
                    <Box>
                        <CKEditor
                            editor={DecoupledEditor}
                            data={content}
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
                            onReady={editor => {

                                editor.ui
                                    .getEditableElement()
                                    .parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                    );
                                editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                                    return new MyUploadAdapter(loader, accessToken);
                                };
                            }}
                            onChange={(event, editor) => {
                                setContent(editor.getData());
                            }}
                        />
                    </Box>

                    <Box>
                        <Button variant='contained' component="label" width='160px'
                            endIcon={<UploadIcon />}
                        >
                            Tải file lên
                            <input hidden accept="image/*" type="file" onChange={handleChooseFile} />
                        </Button>
                    </Box>

                    <Stack direction='row' justifyContent='flex-end' spacing={2}>
                    <Button variant='contained' color="error"
                            onClick={hideEditor}>Huỷ</Button>
                        <LoadingButton variant='contained'
                            loading={loading}
                            onClick={handleSubmit(createLesson)}>Thêm</LoadingButton>
                       
                    </Stack>
                </Stack>
                </Paper>
                :
                <Stack direction={'row'} justifyContent={'center'}>
                    <Button variant='contained' onClick={onClickAdd}>Thêm nội dung</Button>
                </Stack>
            }

        </Box>
    )
}

export default CreateLesson