import {
  Box,
  Paper,
  Divider,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { useTheme } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import moment from 'moment'
import {
  StackLabel,
} from './Component/MUI'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiAssignment from 'apis/apiAssignment';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import LoadingButton from 'components/LoadingButton';
import { getMessageError } from 'utils';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import DOMPurify from 'dompurify';
import { calcDurationTime } from 'utils/formatTime';
import apiSubmitAssignment from 'apis/apiSubmitassignment';
import { ContentWrap } from 'components/UI/Content';

const SubmitAssignment = (props) => {
  const theme = useTheme()
  const paramUrl = useParams()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [slug, setSlug] = useState(paramUrl.slug || '')
  const [assignmentId, setAssignmentId] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [content, setContent] = useState('')
  const [contentSubmission, setContentSubmission] = useState('')
  const [submitAssignmentId, setSubmitAssignmentId] = useState('')
  const [submitTime, setSubmitTime] = useState('')
  const [allowReSubmit, setAllowReSubmit] = useState(false)//cho phép nộp lại
  const [allowSubmitLate, setAllowSubmitLate] = useState(false)//cho phép nộp trễ
  const [points, setPoints] = useState(null)//cho phép nộp trễ
  const [duration, setDuration] = useState(0)//cho phép nộp trễ
  const [loading, setLoading] = useState(false)//loading button
  const [loadingDelete, setLoadingDelete] = useState(false)//loading button
  const accessToken = useSelector(state => state.auth.accessToken)

  const { courseId, id: courseobjId } = useContext(CourseContext)
  const navigate = useNavigate()

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
          let diff = 0
          if (submitAssignment) {
            setSubmitAssignmentId(submitAssignment.id || submitAssignment._id)
            setIsSubmitted(true)
            setContentSubmission(submitAssignment.content)
            setSubmitTime(submitAssignment.submitTime)
            setPoints(submitAssignment.points)
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
      content: contentSubmission
    }
    apiSubmitAssignment.CreateSubmitAssignment(params)
      .then(res => {
        toast.success("Tạo bài tập thành công")
        navigate(`/course/${courseId}/manage-assignment`)
        setSlug(res.slug)

      })
      .finally(() => setLoading(false))
  }

  const handleUpdate = (data) => {
    const params = {
      submitAssignmentId,
      content: contentSubmission
    }
    setLoading(true)
    apiSubmitAssignment.UpdateSubmitAssignment(params)
      .then(res => {
        toast.success("Cập nhật bài tập thành công")
        navigate(`/course/${courseId}/manage-assignment`)
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
        navigate(`/course/${courseId}/manage-assignment`)
      })
      .catch(err => {
        toast.success("Xoá bài nộp không thành công")
      })
      .finally(() => setLoadingDelete(false))
  }


  const submitTimeText = (() => {
    let textDuration = calcDurationTime(duration)
    let text = ''
    if (isSubmitted) {
      text = duration > 0 ? 'Bài tập đã nộp sớm ' : 'Bài tập đã nộp trễ '
      text = text + textDuration
    }
    else {
      text = 'Còn lại ' + textDuration
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
      <Paper elevation={6} sx={{ padding: '12px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
          {name}
        </Typography>

        <Divider />

        <Stack spacing={1.5} my={1.5}>
          <Typography><strong>Thời gian mở: </strong> {moment(startTime).format('LLLL')}</Typography>
          <Typography><strong>Thời gian đóng: </strong> {moment(endTime).format('LLLL')}</Typography>
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
            <Box>{isSubmitted ? moment(submitTime).format('DD-MM-YYYY HH:mm:ss A') : 'Chưa nộp'}</Box>
          </StackLabel>

          <Accordion
            sx={{
              boxShadow: 'none',
            }} defaultExpanded disableGutters TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            ><Typography fontWeight={600}>Nội dung bài tập</Typography>

            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={6}>
              <ContentWrap>
                <Typography dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
              </ContentWrap>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
      <Paper elevation={6}>
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
          </Stack>
          <Stack direction='row' justifyContent='center' spacing={2}>
            {
              editable && <LoadingButton variant='contained' loading={loading}
                onClick={handleUpdate} >
                Sửa bài làm
              </LoadingButton>
            }

            {creatable && <LoadingButton variant='contained' loading={loading}
              onClick={handleCreate}>
              Nộp bài làm
            </LoadingButton>}

            {deletable &&
              <LoadingButton color='error' variant='contained' loading={loadingDelete}
                onClick={handleDelete}>Loại bỏ bài nộp</LoadingButton>

            }
          </Stack>
        </Stack>

      </Paper>

    </Stack >
  )
}

export default SubmitAssignment