import {
  Box,
  Paper,
  Divider,
  Typography,
  Stack,
  Accordion,
  Button,
  AccordionSummary,
  AccordionDetails,
  IconButton,
} from '@mui/material'
import { useTheme } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'
import {
  StackLabel,
} from './Component/MUI'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiAssignment from 'apis/apiAssignment';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import LoadingButton from 'components/LoadingButton';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import DOMPurify from 'dompurify';
import { calcDurationTime } from 'utils/formatTime';
import apiSubmitAssignment from 'apis/apiSubmitassignment';
import { ContentWrap } from 'components/UI/Content';
import apiUpload from 'apis/apiUpload';
import UploadIcon from '@mui/icons-material/Upload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { getMessageError } from 'utils';

const SubmitAssignment = (props) => {
  const theme = useTheme()
  const slug = useParams().slug
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [assignmentId, setAssignmentId] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [content, setContent] = useState('')
  const [contentSubmission, setContentSubmission] = useState('')
  const [submitAssignmentId, setSubmitAssignmentId] = useState('')
  const [file, setFile] = useState('')
  const [fileOfAssign, setFileOfAssign] = useState('')
  const [submitTime, setSubmitTime] = useState('')
  const [allowReSubmit, setAllowReSubmit] = useState(false)//cho phép nộp lại
  const [allowSubmitLate, setAllowSubmitLate] = useState(false)//cho phép nộp trễ
  const [points, setPoints] = useState(null)//cho phép nộp trễ
  const [duration, setDuration] = useState(0)//cho phép nộp trễ
  const [loading, setLoading] = useState(false)//loading button
  const [loadingDelete, setLoadingDelete] = useState(false)//loading button
  const accessToken = useSelector(state => state.auth.accessToken)


  useEffect(() => {
    const getQuestions = () => {
      if (!accessToken) return
      if (!slug) return
      apiAssignment.getAssignmentBySlugOfStudent({ slug })
        .then(res => {
          const { assignment, submitAssignment } = res
          setName(assignment.name)
          document.title = assignment.name
          setStartTime(new Date(assignment.startTime))
          setEndTime(new Date(assignment.endTime))
          setStatus(assignment.status)
          setContent(assignment.content)
          setAllowReSubmit(assignment.allowReSubmit)
          setAllowSubmitLate(assignment.allowSubmitLate)
          setAssignmentId(assignment.id || assignment._id)
          setFileOfAssign(assignment.file)
          let diff = 0
          if (submitAssignment) {
            setSubmitAssignmentId(submitAssignment.id || submitAssignment._id)
            setIsSubmitted(true)
            setContentSubmission(submitAssignment.content)
            setSubmitTime(submitAssignment.submitTime)
            setPoints(submitAssignment.points)
            setFile(submitAssignment.file)
            diff = moment(assignment.endTime).diff(submitAssignment.submitTime, 'seconds')
          }
          else {
            diff = moment(assignment.endTime).diff(new Date(), 'seconds')
          }
          setDuration(diff)

        })

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, accessToken])

  const handleCreate = (data) => {
    setLoading(true)
    const params = {
      assignmentId,
      content: contentSubmission,
      file
    }
    apiSubmitAssignment.CreateSubmitAssignment(params)
      .then(res => {
        const { submitAssignment } = res

        if (res.message === 'Không nằm trong thời gian nộp bài!')
          toast.warning('Không nằm trong thời gian nộp bài!')
        else
          toast.success("Cập nhật bài tập thành công")

        setSubmitAssignmentId(submitAssignment.id || submitAssignment._id)
        setIsSubmitted(true)
        setContentSubmission(submitAssignment.content)
        setSubmitTime(submitAssignment.submitTime)
        setPoints(submitAssignment.points)
        setDuration(moment(endTime).diff(submitAssignment.submitTime, 'seconds') || 0)

      })
      .finally(() => setLoading(false))
  }

  const handleUpdate = (data) => {
    const params = {
      submitAssignmentId,
      content: contentSubmission,
      file
    }
    setLoading(true)
    apiSubmitAssignment.UpdateSubmitAssignment(params)
      .then(res => {
        if (res.message === 'Cập nhật bài tập thành công')
          toast.success("Cập nhật bài tập thành công")
        else
          toast.warning(res.message)

        const submitAssignment = res.updateSubmitAssignment
        setSubmitAssignmentId(submitAssignment.id || submitAssignment._id)
        setIsSubmitted(true)
        setContentSubmission(submitAssignment.content)
        setSubmitTime(submitAssignment.submitTime)
        setPoints(submitAssignment.points)
        setDuration(moment(endTime).diff(submitAssignment.submitTime, 'seconds') || 0)
      })
      .finally(() => setLoading(false))
  }
  const handleDelete = (data) => {
    const params = {
      id: submitAssignmentId
    }
    setLoadingDelete(true)
    apiSubmitAssignment.DeleteSubmitAssignment(params)
      .then(res => {
        toast.success("Xoá bài nộp thành công")
        //navigate(`/course/${courseId}/manage-assignment`)
        setSubmitAssignmentId('')
        setIsSubmitted(false)
        setContentSubmission('')
        setSubmitTime('')
        setPoints(null)
        setDuration(moment(endTime).diff(new Date(), 'seconds') || 0)
      })
      .catch(err => {
        toast.warning(getMessageError(err) || "Xoá bài nộp không thành công")
      })
      .finally(() => setLoadingDelete(false))
  }

  const handleChooseFile = (e) => {
    if (e.target.files.lenght !== 0) {
      const id = toast.loading("Đang tải lên")
      apiUpload.updateFileDeta({ upload: e.target.files[0] })
        .then(res => {
          setFile(res.url)
          toast.update(id, { render: "Tải lên thành công", isLoading: false, type: 'success', autoClose: 1500 })
        })
        .catch(err => {
          toast.update(id, { render: "Tải lên không thành công", isLoading: false, type: 'warning', autoClose: 1500 })
        })
    }
  }

  const onClickDeleteFile = () => {
    setFile(null)
  }

  const submitTimeText = (() => {
    let textDuration = calcDurationTime(duration)
    let text = ''
    if (isSubmitted) {
      text = duration > 0 ? 'Bài tập đã nộp sớm ' : 'Bài tập đã nộp trễ '
      text += textDuration
    }
    else {
      text = duration > 0 ? 'Còn lại ' : 'Quá hạn '
      text += textDuration
    }
    return text
  })()

  const editable = (() => {
    if (!isSubmitted) return false
    if (status === 'close') return false
    if (!allowReSubmit) return false
    if (allowSubmitLate) return true
    if (duration < 0) return false
    return true
  })()
  const creatable = (() => {
    if (isSubmitted) return false
    if (allowSubmitLate) return true
    if (duration < 0) return false
    return true
  })()
  const deletable = (() => {
    if (!isSubmitted) return false
    if (status === 'close') return false
    if (!allowReSubmit) return false
    if (allowSubmitLate) return true
    if (duration < 0) return false
    return true
  })()
  return (
    <Stack spacing={1.5}>
      <Paper elevation={6} sx={{ padding: '16px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
          {name}
        </Typography>

        <Divider />

        <Stack spacing={2} my={1.5}>
          <Typography><strong>Thời gian mở: </strong> {moment(startTime).format('LLL')}</Typography>
          <Typography><strong>Thời gian đóng: </strong> {moment(endTime).format('LLL')}</Typography>
          <Typography fontWeight={600} fontSize='18px'>Trạng thái bài nộp</Typography>

          <StackLabel>
            <Box>Trạng thái bài nộp</Box>
            <Box>{isSubmitted ? 'Đã nộp để chấm điểm' : 'Chưa nộp bài'}</Box>
          </StackLabel>
          <StackLabel>
            <Box>Trạng thái chấm điểm</Box>
            <Box>{points !== null ? points : 'Chưa chấm điểm'}</Box>
          </StackLabel>
          <StackLabel>
            <Box>Thời gian còn lại</Box>
            <Box>
              {submitTimeText}
            </Box>
          </StackLabel>
          <StackLabel>
            <Box>Chỉnh sửa lần cuối</Box>
            <Box>{isSubmitted ? moment(submitTime).format('LLL') : 'Chưa nộp'}</Box>
          </StackLabel>
          {fileOfAssign &&
            <StackLabel>
              <Box>File đính kèm</Box>
              <Box>
                <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${fileOfAssign}`} target="_blank" rel="noopener noreferrer">
                  {fileOfAssign.split('__').pop()}</a>
              </Box>
            </StackLabel>
          }

          <Accordion
            sx={{
              boxShadow: 'none',
            }} defaultExpanded disableGutters TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              sx={{ justifyContent: 'center' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            ><Typography fontWeight={600} flex={1} fontSize='20px' textAlign='center'>Nội dung bài tập</Typography>

            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Paper elevation={6}>
                <ContentWrap>
                  <Box dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] }) }} />
                </ContentWrap>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
      {
        (creatable || editable) && <Paper elevation={6}>
          <Stack p={2}>

            <Stack spacing={1.5} mb={2}>
              <Typography fontSize='20px' fontWeight={600} my={2} align='center'>Nhập nội dung bài làm</Typography>
              <CKEditor
                editor={DecoupledEditor}
                data={contentSubmission}
                disabled={!allowReSubmit}
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
                  setContentSubmission(editor.getData());
                }}
              />

              {
                file ?
                  <Stack direction='row' spacing={1} alignItems={'center'}>
                    <a href={`https://be-oes.vercel.app/api/upload/download-deta?filename=${file}`} target="_blank" rel="noopener noreferrer">
                      <AttachFileIcon sx={{ 'transform': 'translateY(6px)' }} />
                      {file.split('__').pop()}</a>
                    <IconButton onClick={onClickDeleteFile} size="small" color='warning' sx={{ 'transform': 'translateY(3px)' }} >
                      <DeleteIcon fontSize="small" color="error" />
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

            <Stack direction='row' justifyContent='center' spacing={2}>
              {
                editable && <LoadingButton variant='contained' loading={loading}
                  onClick={handleUpdate} >
                  Sửa bài nộp
                </LoadingButton>
              }

              {creatable && <LoadingButton variant='contained' loading={loading}
                onClick={handleCreate}>
                Nộp bài
              </LoadingButton>}

              {deletable &&
                <LoadingButton color='error' variant='contained' loading={loadingDelete}
                  onClick={handleDelete}>Loại bỏ bài nộp</LoadingButton>

              }
            </Stack>
          </Stack>

        </Paper>
      }

    </Stack >
  )
}

export default SubmitAssignment