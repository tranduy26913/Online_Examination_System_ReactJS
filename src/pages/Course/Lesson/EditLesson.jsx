import { Box, Button, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, Stack, Switch, Typography } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton';
// import { getMessageError } from 'utils';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import { Stack2Column, StackLabel } from 'pages/Dashboard/CreateExamination/Component/MUI';
import DOMPurify from 'dompurify';
import EditIcon from '@mui/icons-material/Edit';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import apiLessons from 'apis/apiLessons';
import ConfirmButton from 'components/ConfirmDialog';
import apiUpload from 'apis/apiUpload';
import CheckIcon from '@mui/icons-material/Check';
function EditLesson(props) {
    const [content, setContent] = useState('')
    const [lessonId, setLessonId] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [seen, setSeen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState('')
    const [status, setStatus] = useState(true)
    const accessToken = useSelector(state => state.auth.accessToken)
    const role = useSelector(state => state.setting.role) || 'student'
    const {  id: courseObjId ,UpdateProcessing} = useContext(CourseContext)

    const { handleSubmit,  control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: props.name,
            startTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            endTime: moment(new Date()).add(10, 'minutes').format("YYYY-MM-DDTHH:mm")
        }
    });

    useEffect(() => {
        setContent(props.content)
        setStatus(props.status)
        setLessonId(props.lessonId)
        setSeen(props.seen)
        setFile(props.file)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.content, props.title])
    const onClickEdit = () => {
        setIsEdit(true)
    }

    const hideEditor = () => setIsEdit(false)

    const editLesson = (data) => {
        const { name, startTime, endTime } = data
        const params = {
            lessonId,
            courseId: courseObjId,
            name,
            content,
            startTime,
            endTime,
            status
        }
        setLoading(true)
        apiLessons.updateLesson(params)
            .then(res => {
                toast.success("Cập nhật thành công")
                setIsEdit(false)
                props.getData()
            })
            .catch(err => {
                toast.warning("Cập nhật không thành công")
            })
            .finally(() => setLoading(false))
    }

    const deleteLesson = () => {
        const params = {
            id: lessonId,
        }
        const id = toast.loading("Đang xoá...")
        apiLessons.deleteLesson(params)
            .then(res => {
                toast.update(id, { render: 'Xoá thành công', isLoading: false, type: 'success', autoClose: 1200 })
                setIsEdit(false)
                props.getData()
            })
            .catch(err => {
                toast.update(id, { render: 'Xoá không thành công', isLoading: false, type: 'warning', autoClose: 1200 })
            })
            .finally(() => setLoading(false))
    }

    const handleChooseFile = (e) => {
        if (e.target.files.lenght !== 0) {
            apiUpload.updateFile({ upload: e.target.files[0] })
                .then(res => {
                    setFile(res.url)
                })
        }
    }

    const handleSeenLesson = () => {
        apiLessons.seenLesson({ lessonId })
            .then(res => {
                setSeen(true)
                UpdateProcessing()
            })
    }
    const handleUnseenLesson = () => {
        apiLessons.unseenLesson({ lessonId })
            .then(res => {
                setSeen(false)
                UpdateProcessing()
            })
    }
    return (
        <Box spacing={2}>
            {isEdit ?
                <Stack spacing={2}>
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
                                    control={<Switch checked={status === 'public' }
                                        onChange={() => setStatus(status === 'public' ? 'private' : 'public')} />} />
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
                            Tải ảnh lên
                            <input hidden accept="image/*" type="file" onChange={handleChooseFile} />
                        </Button>
                    </Box>

                    <Stack direction='row' justifyContent='flex-end'>
                        <LoadingButton
                            variant='contained'
                            loading={loading} onClick={handleSubmit(editLesson)}>Cập nhật</LoadingButton>

                        <Button variant='contained' onClick={hideEditor}>Huỷ</Button>
                    </Stack>
                </Stack>
                :
                <Stack spacing={1.5}>
                    <Stack
                        direction='row'
                        justifyContent='space-between'>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography fontWeight={600} fontSize={'20px'}>{props.name}
                            </Typography>   
                            {status === 'private' && <Chip label="Đang ẩn" color="primary" size='small' />}

                        </Stack>
                        {
                            role === 'student' ?
                                seen ?
                                    <Button variant='outlined' startIcon={<CheckIcon />}
                                        onClick={handleUnseenLesson}
                                    >Đã đọc</Button>
                                    :
                                    <Button variant='outlined' startIcon={<CheckIcon />}
                                        onClick={handleSeenLesson}
                                    >Đánh dấu đã đọc</Button>
                                :
                                <Stack direction='row'>
                                    <IconButton onClick={onClickEdit} size="small" color='warning'>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <ConfirmButton handleFunc={deleteLesson}
                                        title='Xoá nội dung bài giảng'
                                        description={'Bạn có chắc chắn muốn xoá nội dung bài giảng này không'}>
                                        {/* <IconButton aria-label="delete" size="small" color='error'> */}
                                        <DeleteIcon fontSize="small" color='error' />
                                        {/* </IconButton> */}
                                    </ConfirmButton>

                                </Stack>
                        }

                    </Stack>
                    <Box mt={1} pl={2}>
                        <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                        {file &&
                            <a href={file} target="_blank" rel="noopener noreferrer">
                                <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                                {file.split('/').pop()}</a>}
                    </Box>

                    <Divider />
                </Stack>
            }

        </Box>
    )
}

export default EditLesson