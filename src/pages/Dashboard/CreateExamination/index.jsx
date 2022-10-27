import {
  Box,
  Paper,
  Divider,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Button,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  FormGroup,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
} from '@mui/material'
import { useTheme } from '@mui/system';
import CreateQuestion from 'components/Question/CreateQuestion'
import DetailQuestion from 'components/Question/DetailQuestion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment'
import apiCourse from 'apis/apiCourse'
import {
  PaperQuestion,
  AccordionSummaryStyle,
  StackLabel,
  Stack2Column
} from './Component/MUI'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiExamination from 'apis/apiExamination';
import { toast } from 'react-toastify';
import {useNavigate, useSearchParams } from 'react-router-dom';
import apiQuestion from 'apis/apiQuestion';
import { addQuestion, clearQuestion } from 'slices/userSlice';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
/**
 * @param {Date} date 
 */

const toStringDateTime = (date) => {
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
  const year = date.getFullYear()
  const time = date.toLocaleTimeString().split(':')
  const hour = time[0]
  const min = time[1]
  return `${year}-${month}-${day}T${hour}:${min}`
}

const CreateExamination = (props) => {
  const theme = useTheme()
  const paramUrl = useSearchParams()[0]

  const [isEdit, setIsEdit] = useState(props.isEdit)
  const [examId, setExamId] = useState(paramUrl.get('examId') || '')
  const [name, setName] = useState('')
  const [numberofQuestion, setNumberofQuestion] = useState(1)
  const [idQuestion, setIdQuestion] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [viewAnswer, setViewAnswer] = useState('no')
  const [viewMark, setViewMark] = useState('no')
 // const [accessExam, setAccessExam] = useState('2')
  const [typeMark, setTypeMark] = useState('max')
  const [start, setStart] = useState(toStringDateTime(new Date()))//thời gian bắt đầu
  const [end, setEnd] = useState(toStringDateTime(new Date()))//thời gian kết thúc
  const [duration, setDuration] = useState(1)//thời lượng bài thi (phút)
  //const [inputQuestion, setInputQuestion] = useState(true)//tự nhập câu hỏi/lấy từ ngân hàng đề
  const [pinExam, setPinExam] = useState('')//tự nhập câu hỏi/lấy từ ngân hàng đề
  const [isLimit, setIsLimit] = useState(true)//giới hạn số lần thi
  const [limit, setLimit] = useState(0)//Số lần được phép thi tối đa
  const user = useSelector(state => state.auth.user)
  const {id} = useContext(CourseContext)
  const QUESTIONS = useSelector(state => state.user.questions)
  const dispatch = useDispatch()
const navigate = useNavigate()
  

  useEffect(() => {
    const getQuestions = () => {
      if (!user)
        return
      if (!examId)
        return
      apiExamination.getExaminationsById(examId)
        .then(res => {
          try {
            const exam = res[0]
            dispatch(clearQuestion())
            setName(exam.name)
            const questions = exam.questions
            questions.forEach(item=>{
              apiQuestion.getQuestionsById(item)
                .then(res=>{
                    const question = res
                    dispatch(addQuestion(question))
                })
            })
          }
          catch (err) {
          }
        })

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId])

  const handleChangeQuestion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeName = event => setName(event.target.value)
  const handleChangeNumberQuestion = (event) => {
    let newValue = Number(event.target.value |= 0)
    
     if(newValue > 200)
      newValue = 200
    setNumberofQuestion(newValue)
  }
  const handleChangeViewAnswer = event => setViewAnswer(event.target.value)
  const handleChangeViewMark = event => setViewMark(event.target.value)
  const handleChangeTypeMark = event => setTypeMark(event.target.value)
  const handleChangePinExam = event => setPinExam(event.target.value)
  //const handleChangeInputQuestion = event => setInputQuestion(event.target.value)
  //const handleChangeAccessExam = event => setAccessExam(event.target.value)

  const onChangeStartTime = event => {
    const newDate = moment(new Date(event.target.value)).format("YYYY-MM-DDThh:mm");
    setStart(newDate)
  }
  const onChangeEndTime = event => {
    const newDate = moment(new Date(event.target.value)).format("YYYY-MM-DDThh:mm");
    setEnd(newDate)
  }

  const handleSelectQuestionEdit = useCallback((value) => setIdQuestion(value), [])
  const onChangeDuration = (event) => setDuration(Number(event.target.value |= 0))
  const onChangeLimit = (event) => setLimit(Number(event.target.value |= 0))
 // const handleChangeCourse = (event) => setCourse(event.target.value)

  const handleSubmit = () => {
    const params = {
      name,
      numberofQuestion,
      courseId: id,
      description: '',
      tracking,
      startTime: start,
      endTime: end,
      attemptsAllowed: isLimit ? limit : 0,
      maxPoint: 0,
      maxTime: duration,
      shuffle,
      typeMark,
      viewMark,
      viewAnswer,
      //allowAccess: accessExam,
      pin: pinExam
    }
    apiExamination.createExam(params)
      .then(res => {
        console.log(res)
        toast.success("Tạo đề thi thành công")
        //navigate('')
        // setExamId(res.id)
        // setIsEdit(true)
      })
  }

  return (
    <Stack spacing={1}>
      <Paper elevation={12} sx={{ padding: '12px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
          Thông tin đề thi
        </Typography>

        <Divider />

        <Stack spacing={1.5} my={1.5}>
          <StackLabel>
            <Box>Tên đề thi</Box>
            <input type='text' value={name}
              onChange={handleChangeName} />
          </StackLabel>

          <Stack2Column>

            <StackLabel>
              <Box>Số câu hỏi</Box>
              <input type='number' value={numberofQuestion} min='1' max='201'
                onInput={handleChangeNumberQuestion} />
            </StackLabel>
            <StackLabel>
              <Box>Thời lượng làm bài (phút)</Box>
              <input value={duration}
                //onChange={onChangeDuration} 
                type='number' min={1}
                onInput={onChangeDuration} />
            </StackLabel>
          </Stack2Column>

          <Stack2Column>
            <StackLabel>
              <Box>Giám sát tự động</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={tracking} onChange={() => setTracking(!tracking)} />} />
              </FormGroup>
            </StackLabel>

            <StackLabel>
              <Box>Đảo câu hỏi và đáp án</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={shuffle} onChange={() => setShuffle(!shuffle)} />} />
              </FormGroup>
            </StackLabel>
          </Stack2Column>
          <Stack2Column>
            <StackLabel alignItems='center'>
              <Box>Thời gian bắt đầu</Box>
              <input type='datetime-local'
                onChange={onChangeStartTime}
                value={start}
                min="1997-01-01T00:00" max="2030-12-31T00:00"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
            </StackLabel>
            <StackLabel alignItems='center'>
              <Box>Thời gian kết thúc</Box>
              <input type='datetime-local'
                onChange={onChangeEndTime}
                value={end}
                min="1997-01-01T00:00" max="2030-12-31T00:00"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
            </StackLabel>
          </Stack2Column>

          <Stack2Column>
            <StackLabel>
              <Box>Mật khẩu đề thi</Box>
              <input type='text'
                onChange={handleChangePinExam}
                value={pinExam}
              />
            </StackLabel>

            {/* <StackLabel>
              <Box>Khoá học</Box>
              <Select
                value={course}
                onChange={handleChangeCourse}
                input={<BootstrapInput />}
              >
                {
                  listCourse.map(item =>
                    <MenuItem value={item.id}>{item.name}</MenuItem>)
                }
              </Select>
            </StackLabel> */}
          </Stack2Column>

          <StackLabel>
            <Box>Cho xem đáp án</Box>
            <RadioGroup
              row
              name="viewAnswer"
              value={viewAnswer}
              onChange={handleChangeViewAnswer}
            >
              <FormControlLabel value="no" control={<Radio size='small' />} label="Không" />
              <FormControlLabel value="done" control={<Radio size='small' />} label="Khi thi xong" />
              <FormControlLabel value="alldone" control={<Radio size='small' />} label="Khi tất cả thi xong" />
            </RadioGroup>
          </StackLabel>

          <StackLabel>
            <Box>Cho xem điểm</Box>
            <RadioGroup
              row
              name="viewMark"
              value={viewMark}
              onChange={handleChangeViewMark}
            >
              <FormControlLabel value="no" control={<Radio size='small' />} label="Không" />
              <FormControlLabel value="done" control={<Radio size='small' />} label="Khi thi xong" />
              <FormControlLabel value="alldone" control={<Radio size='small' />} label="Khi tất cả thi xong" />
            </RadioGroup>
          </StackLabel>

          {/* <StackLabel>
            <Box>Ai được phép thi</Box>
            <RadioGroup
              row
              name="accessExam"
              value={accessExam}
              onChange={handleChangeAccessExam}
            >
              <FormControlLabel value="0" control={<Radio size='small' />} label="Tất cả mọi người" />
              <FormControlLabel value="1" control={<Radio size='small' />} label="Đã đăng ký tài khoản" />
              <FormControlLabel value="2" control={<Radio size='small' />} label="Trong khoá học" />
            </RadioGroup>
          </StackLabel> */}

          {/* <StackLabel>
            <Box>Cách nhập câu hỏi</Box>
            <RadioGroup
              row
              name="inputQuestion"
              value={inputQuestion}
              onChange={handleChangeInputQuestion}
            >
              <FormControlLabel value={true} control={<Radio size='small' />} label="Tự nhập câu hỏi" />
              <FormControlLabel value={false} control={<Radio size='small' />} label="Lấy từ ngân hàng câu hỏi" />
            </RadioGroup>
          </StackLabel> */}

          <StackLabel>
            <Box>Cách tính điểm</Box>
            <RadioGroup
              row
              name="typeMark"
              value={typeMark}
              onChange={handleChangeTypeMark}
            >
              <FormControlLabel value={'max'} control={<Radio size='small' />} label="Lấy điểm cao nhất" />
              <FormControlLabel value={'last'} control={<Radio size='small' />} label="Lấy điểm lần thi cuối" />
              <FormControlLabel value={'avg'} control={<Radio size='small' />} label="Lấy điểm trung bình các lần thi" />
            </RadioGroup>
          </StackLabel>
          <Stack2Column>

            <StackLabel>
              <Box>Giới hạn số lần thi</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={isLimit} onChange={() => setIsLimit(!isLimit)} />} />
              </FormGroup>
            </StackLabel>

            {
              isLimit &&
              <StackLabel>
                <Box>Số lần thi tối đa</Box>
                <input value={limit}
                  type='number' min={1}
                  onInput={onChangeLimit} />
              </StackLabel>
            }
          </Stack2Column>

        </Stack>

        <Stack alignItems='center'>
          <Button variant='contained' onClick={handleSubmit}>Lưu cấu hình</Button>
        </Stack>
      </Paper>
      {
        isEdit && <>
          <Paper sx={{ marginBottom: '12px' }}>
            <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }}>Danh sách câu hỏi</Typography>
          </Paper>
          {
            QUESTIONS.map((item,index) =>

              <PaperQuestion key={item.id} elevation={12} >
                <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
                  <AccordionSummary sx={AccordionSummaryStyle}
                    expandIcon={<ExpandMoreIcon />}
                  ><Typography>Câu hỏi {index+1}</Typography>

                  </AccordionSummary>
                  <AccordionDetails>
                    {idQuestion === item.id ?
                      <CreateQuestion edit={true} id={idQuestion}
                      handleSelectQuestion = {handleSelectQuestionEdit}
                        question={item} /> : <DetailQuestion id={item.id} question={item} handleEdit={handleSelectQuestionEdit} />}
                  </AccordionDetails>
                </Accordion>
              </PaperQuestion>

            )
          }
          <PaperQuestion elevation={12} >
            <CreateQuestion edit={false} id='' examId={examId} />
          </PaperQuestion>
          {/* <Button variant='contained' onClick={handleCreateQuestion}>Tạo câu hỏi mới</Button> */}
        </>
      }

    </Stack >
  )
}

export default CreateExamination