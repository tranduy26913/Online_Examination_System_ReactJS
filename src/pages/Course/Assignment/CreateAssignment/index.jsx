import {
  Box,
  Paper,
  Divider,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  FormGroup,
  FormHelperText,
  FormControl,
  IconButton,
  Button,
} from '@mui/material'
import { useTheme } from '@mui/system';
import moment from 'moment'
import {
  StackLabel,
  Stack2Column
} from './Component/MUI'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiAssignment from 'apis/apiAssignment';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton';
import { getMessageError } from 'utils';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import apiUpload from 'apis/apiUpload';
import UploadIcon from '@mui/icons-material/Upload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';

const CreateAssignment = (props) => {
  const theme = useTheme()
  const paramUrl = useParams()

  const [isEdit, setIsEdit] = useState(props.isEdit)
  const [slug, setSlug] = useState(paramUrl.slug || '')
  const [id, setId] = useState('')
  const [status, setStatus] = useState('')
  const [content, setContent] = useState('')
  const [file, setFile] = useState('')
  const [allowReSubmit, setAllowReSubmit] = useState(false)//cho phép nộp lại
  const [allowSubmitLate, setAllowSubmitLate] = useState(false)//cho phép nộp trễ
  const [loading, setLoading] = useState(false)//loading button
  const [loadingPublish, setLoadingPublish] = useState(false)//loading button
  const accessToken = useSelector(state => state.auth.accessToken)

  const { courseId, id: courseobjId } = useContext(CourseContext)
  const navigate = useNavigate()

  const { handleSubmit, setValue, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      maxPoints: 10,
      startTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      endTime: moment(new Date()).add(10, 'minutes').format("YYYY-MM-DDTHH:mm")
    }
  });

  useEffect(() => {
    const getQuestions = () => {
      if (!accessToken) return
      if (!slug) return
      apiAssignment.getAssignmentBySlug({ slug })
        .then(res => {
          try {
            setValue('name', res.name)
            setValue('startTime', moment(res.startTime).format("YYYY-MM-DDTHH:mm"))
            setValue('endTime', moment(res.endTime).format("YYYY-MM-DDTHH:mm"))
            setValue('maxPoints', res.maxPoints)
            setStatus(res.status)
            setAllowReSubmit(res.allowReSubmit)
            setAllowSubmitLate(res.allowSubmitLate)
            setContent(res.content)
            setId(res.id || res._id)
            setFile(res.file)
          }
          catch (err) {
          }
        })

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, accessToken])

  const handleCreate = (data) => {
    const { name, startTime, endTime, maxPoints} = data

    const params = {
      name,
      courseId: courseobjId,
      status: 'private',
      content,
      maxPoints,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      allowReSubmit,
      allowSubmitLate,
      file
    }
    apiAssignment.createAssignment(params)
      .then(res => {
        toast.success("Tạo bài tập thành công")
        navigate(`/course/${courseId}/assignment/${res.slug}`)
        setSlug(res.slug)
        setIsEdit(true)
      })
      .catch(err=>{
        toast.warning(getMessageError(err) || "Cập nhật không thành công")
      })
  }

  const handleUpdate = (data) => {
    const { name, startTime, endTime, maxPoints, } = data

    const params = {
      assignmentId: id,
      name,
      courseId: courseobjId,
      content,
      maxPoints,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      allowReSubmit,
      allowSubmitLate,
      file
    }
    setLoading(true)
    apiAssignment.updateAssignment(params)
      .then(res => {
        toast.success("Cập nhật bài tập thành công")
        navigate(`/course/${courseId}/manage-assignment`)
      })
      .catch(err=>{
        toast.warning(getMessageError(err) || "Cập nhật không thành công")
      })
      .finally(() => setLoading(false))
  }

  const handleChangeStatus = () => {
    const params = {
      id
    }
    setLoadingPublish(true)
    let request = apiAssignment.PublishAssignment(params)
    if (status === 'public')
      request = apiAssignment.CloseAssignment(params)
    request.then(res => {
      toast.success(res.message)
      if (status === 'public')
        setStatus('close')
      else
        setStatus('public')

    })
      .catch(err => {
        toast.warning(getMessageError(err))
      })
      .finally(() => setLoadingPublish(false))
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

  const onClickDeleteFile = () => {
    setFile(null)
  }

  return (
    <Stack spacing={1}>
      <Paper elevation={12} sx={{ padding: '12px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
          Thông tin bài tập
        </Typography>

        <Divider />

        <Stack spacing={1.5} my={1.5}>
          <StackLabel>
            <Box>Tên bài tập</Box>
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
            <Box>Điểm tối đa</Box>
            <FormControl>
              <Controller
                name={"maxPoints"}
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


          <Stack2Column>
            <StackLabel>
              <Box>Cho phép nộp lại</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={allowReSubmit}
                    onChange={() => setAllowReSubmit(!allowReSubmit)} />} />
              </FormGroup>
            </StackLabel>
            <StackLabel>
              <Box>Cho phép nộp trễ</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={allowSubmitLate}
                    onChange={() => setAllowSubmitLate(!allowSubmitLate)} />} />
              </FormGroup>
            </StackLabel>
          </Stack2Column>
          <Stack spacing={1.5} mb={2}>
            <Typography fontWeight={600} mb={1}>Nhập nội dung bài tập</Typography>
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
          </Stack>

          {
            file ?
              <Stack direction='row' spacing={1} alignItems={'center'}>
                <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${file}`} target="_blank" rel="noopener noreferrer">
                  <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                  {file.split('__').pop()}</a>
                <IconButton onClick={onClickDeleteFile} size="small" color='warning' sx={{ 'transform': 'translateY(3px)' }} >
                  <DeleteIcon fontSize="small" color="error"  />
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

        </Stack>
        {
          status !== 'close' &&
          <Stack direction='row' justifyContent='center' spacing={2}>
            <LoadingButton variant='contained' loading={loading}
              onClick={isEdit ? handleSubmit(handleUpdate) : handleSubmit(handleCreate)}>Lưu bài tập</LoadingButton>
            {status && status !== 'close' && <LoadingButton variant='contained' loading={loadingPublish}
              onClick={handleChangeStatus}>{status === 'private' ? 'Xuất bản' : 'Đóng bài tập'}</LoadingButton>}
          </Stack>
        }
      </Paper>


    </Stack >
  )
}

export default CreateAssignment