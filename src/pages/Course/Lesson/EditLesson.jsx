import { Box, Button, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, Paper, Stack, Switch, Typography } from '@mui/material'
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
import { getMessageError } from 'utils';
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
    const { id: courseObjId, UpdateProcessing } = useContext(CourseContext)

    const { handleSubmit, control, setValue } = useForm({
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
        setValue("startTime", moment(new Date(props.startTime)).format("YYYY-MM-DDTHH:mm"))
        setValue("endTime", moment(new Date(props.endTime)).format("YYYY-MM-DDTHH:mm"))

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
            file,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            status
        }
        setLoading(true)
        apiLessons.updateLesson(params)
            .then(res => {
                toast.success("Cập nhật bài giảng thành công")
                setIsEdit(false)
                props.getData()
            })
            .catch(err => {
                toast.warning(getMessageError(err) || "Cập nhật bài giảng không thành công")
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
          const id = toast.loading("Đang tải lên")
          apiUpload.updateFileDeta({'upload': e.target.files[0]})
            .then(res => {
              setFile(res.url)
              toast.update(id, { render: "Tải lên thành công",isLoading:false, type:'success',autoClose: 1500 })
            })
            .catch(err => {
              toast.update(id, { render: "Tải lên không thành công",isLoading:false, type:'warning',autoClose: 1500 })
            })
        }
      }

    const onClickDeleteFile = () =>{
        setFile(null)
    }

    const handleSeenLesson = () => {
        setSeen(true)
        apiLessons.seenLesson({ lessonId })
            .then(res => {
                UpdateProcessing()
            })
    }
    const handleUnseenLesson = () => {
        setSeen(false)
        apiLessons.unseenLesson({ lessonId })
            .then(res => {
                UpdateProcessing()
            })
    }
    return (
        <Box spacing={2}>
            {isEdit ?
                <Paper elevation={6}>
                    <Stack spacing={2} p={2}>
                        <Typography align="center" fontSize="20px" color="primary">Chỉnh sửa bài giảng</Typography>
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
                                        control={<Switch checked={status === 'public'}
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
                                    },
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
                        {
                            file ?
                                <Stack direction='row'>
                                    <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${file}`} target="_blank" rel="noopener noreferrer">
                                        <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                                        {file.split('__').pop()}</a>
                                    <IconButton onClick={onClickDeleteFile} size="small" color='warning'>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Stack>

                                :
                                <Box>
                                    <Button variant='contained' component="label" width='160px'
                                        endIcon={<UploadIcon />}
                                    >
                                        Tải file lên
                                        <input hidden type="file" onChange={handleChooseFile} />
                                    </Button>
                                </Box>
                        }


                        <Stack direction='row' justifyContent='flex-end' gap={2}>
                            <Button variant='contained' color='error' onClick={hideEditor}>Huỷ</Button>
                            <LoadingButton
                                variant='contained'
                                loading={loading} onClick={handleSubmit(editLesson)}>Cập nhật</LoadingButton>


                        </Stack>
                    </Stack>
                </Paper>
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
                        <Box className="lesson" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, 
                            { ALLOWED_TAGS: ["iframe"], ADD_ATTR: ['allow', 'frameborder', 'scrolling'] }) }} />
                        {file &&
                            <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${file}`} target="_blank" rel="noopener noreferrer">
                                <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                                {file.split('__').pop()}</a>}
                    </Box>

                    <Divider />
                </Stack>
            }

        </Box>
    )
}

export default EditLesson