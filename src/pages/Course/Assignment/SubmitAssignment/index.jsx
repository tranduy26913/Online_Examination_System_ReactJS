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

const SubmitAssignment = (props) => {
  const theme = useTheme()
  const paramUrl = useParams()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [slug, setSlug] = useState(paramUrl.slug || '')
  const [assignmentId, setAssignmentId] = useState('')
  const [id, setId] = useState('')
  const [status, setStatus] = useState('')
  const [name, setName] = useState('')
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [content, setContent] = useState('')
  const [contentSubmission, setContentSubmission] = useState('')
  const [submissionId, setSubmissionId] = useState('')
  const [submitTime, setSubmitTime] = useState('')
  const [allowReSubmit, setAllowReSubmit] = useState(false)//cho phép nộp lại
  const [allowSubmitLate, setAllowSubmitLate] = useState(false)//cho phép nộp trễ
  const [loading, setLoading] = useState(false)//loading button
  const accessToken = useSelector(state => state.auth.accessToken)

  const { courseId, id: courseobjId } = useContext(CourseContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getQuestions = () => {
      if (!accessToken) return
      if (!slug) return
      apiAssignment.getAssignmentBySlug({slug})
        .then(res => {
          try {
            setName(res.name)
            setStartTime(new Date(res.startTime))
            setEndTime(new Date(res.endTime))
            setStatus(res.status)
            setContent(res.content)
            setAllowReSubmit(res.allowReSubmit)
            setAllowSubmitLate(res.allowSubmitLate)
            setId(res.id || res._id)
            if (res.submission) {
              setIsSubmitted(true)
              setSubmissionId(res.submission.id)
              setContentSubmission(res.submission.content)
              setSubmitTime(res.submission.submitTime)
            }
          }
          catch (err) {
          }
        })

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, accessToken])

  const handleCreate = (data) => {

    const params = {
      assignmentId,
      contentSubmission
    }
    apiAssignment.SubmitAssignment(params)
      .then(res => {
        toast.success("Tạo bài tập thành công")
        navigate(`/course/${courseId}/detail-asignment/${res.slug}`)
        setSlug(res.slug)

      })
  }

  const handleUpdate = (data) => {

    const params = {
      id,
      assignmentId,
      contentSubmission
    }
    setLoading(true)
    apiAssignment.updateAssignment(params)
      .then(res => {
        toast.success("Cập nhật bài tập thành công")
        //navigate(`/course/${courseId}/detail-exam/${res.slug}`)
      })
      .finally(() => setLoading(false))
  }



  return (
    <Stack spacing={1.5}>
      <Paper elevation={6} sx={{ padding: '12px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
          {name}
        </Typography>

        <Divider />

        <Stack spacing={1.5} my={1.5}>
          <Typography>Thời gian bắt đầu: {startTime.toString()}</Typography>
          <Typography>Thời gian kết thúc: {endTime.toString()}</Typography>
          <Typography fontSize='20px'>Trạng thái bài nộp</Typography>

          <StackLabel>
            <Box>Trạng thái bài nộp</Box>
            <Box>Đã nộp để chấm điểm</Box>
          </StackLabel>
          <StackLabel>
            <Box>Trạng thái chấm điểm</Box>
            <Box>Chưa chấm điểm</Box>
          </StackLabel>
          <StackLabel>
            <Box>Thời gian còn lại</Box>
            <Box>Bài tập đã được gửi sớm 3 phút 31 giây</Box>
          </StackLabel>
          <StackLabel>
            <Box>Chỉnh sửa lần cuối</Box>
            <Box>Wednesday, 14 September 2022, 7:36 PM</Box>
          </StackLabel>

          <Accordion
            sx={{
              boxShadow: 'none',
            }} defaultExpanded disableGutters TransitionProps={{ unmountOnExit: true }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontWeight={600}>Nội dung bài tập</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <Typography>{content}</Typography>
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
            <LoadingButton variant='contained' loading={loading}
              onClick={isSubmitted ? handleUpdate : handleCreate}>
              {isSubmitted ? 'Sửa bài làm' : 'Nộp bài làm'}
            </LoadingButton>
            {isSubmitted && 
            <LoadingButton color='error' variant='contained' loading={loading}
              onClick={isSubmitted ? handleUpdate : handleCreate}>Loại bỏ bài nộp</LoadingButton>
            }
          </Stack>
        </Stack>

      </Paper>

    </Stack >
  )
}

export default SubmitAssignment