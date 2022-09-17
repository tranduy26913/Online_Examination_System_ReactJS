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
  BootstrapInput,
  Stack2Column
} from './Component/MUI'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { lightGreen } from '@mui/material/colors';
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

const CreateExamination = () => {
  const theme = useTheme()
  const isCreateQuestion = false
  const [idQuestion, setIdQuestion] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [follow, setFollow] = useState(false);
  const [shutle, setShutle] = useState(false);
  const [viewAnswer, setViewAnswer] = useState('1')
  const [viewMark, setViewMark] = useState('1')
  const [accessExam, setAccessExam] = useState('2')
  const [start, setStart] = useState(toStringDateTime(new Date()))//thời gian bắt đầu
  const [end, setEnd] = useState(toStringDateTime(new Date()))//thời gian kết thúc
  const [duration, setDuration] = useState(1)//thời lượng bài thi (phút)
  const [inputQuestion, setInputQuestion] = useState(true)//tự nhập câu hỏi/lấy từ ngân hàng đề
  const [pinExam, setPinExam] = useState('')//tự nhập câu hỏi/lấy từ ngân hàng đề
  const [isLimit, setIsLimit] = useState(true)//giới hạn số lần thi
  const [limit, setLimit] = useState(0)//Số lần được phép thi tối đa
  const [listCourse, setListCourse] = useState([])
  const [course, setCourse] = useState('');
 const user = useSelector(state=>state.auth.user)
  useEffect(()=>{
    const getCourses = ()=>{
      const params = {
        idUser:user.id
      }
      apiCourse.getCourses(params)
      .then(res=>{
        setListCourse(res)
      })
      .catch(err=>{
        console.log(err);
      })
    }
    getCourses()
  },[])

  const handleChangeQuestion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeViewAnswer = event => setViewAnswer(event.target.value)
  const handleChangeViewMark = event => setViewMark(event.target.value)
  const handleChangeAccessExam = event => setAccessExam(event.target.value)
  const handleChangeInputQuestion = event => setInputQuestion(event.target.value)
  const handleChangePinExam = event => setPinExam(event.target.value)

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
  const handleChangeCourse = (event) => setCourse(event.target.value)

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
            <input type='text' />
          </StackLabel>

          <Stack2Column>

            <StackLabel>
              <Box>Số câu hỏi</Box>
              <input type='number' />
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
                  control={<Switch checked={follow} onChange={() => setFollow(!follow)} />} />
              </FormGroup>
            </StackLabel>

            <StackLabel>
              <Box>Đảo câu hỏi và đáp án</Box>
              <FormGroup row>
                <FormControlLabel
                  control={<Switch checked={shutle} onChange={() => setShutle(!shutle)} />} />
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

            <StackLabel>
              <Box>Khoá học</Box>
              <Select
                value={course}
                onChange={handleChangeCourse}
                input={<BootstrapInput />}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {
                  listCourse.map(item=>
                    <MenuItem value={item.id}>{item.name}</MenuItem>)
                }
              </Select>
            </StackLabel>
          </Stack2Column>

          <StackLabel>
            <Box>Cho xem đáp án</Box>
            <RadioGroup
              row
              name="viewAnswer"
              value={viewAnswer}
              onChange={handleChangeViewAnswer}
            >
              <FormControlLabel value="0" control={<Radio size='small' />} label="Không" />
              <FormControlLabel value="1" control={<Radio size='small' />} label="Khi thi xong" />
              <FormControlLabel value="2" control={<Radio size='small' />} label="Khi tất cả thi xong" />
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
              <FormControlLabel value="0" control={<Radio size='small' />} label="Không" />
              <FormControlLabel value="1" control={<Radio size='small' />} label="Khi thi xong" />
              <FormControlLabel value="2" control={<Radio size='small' />} label="Khi tất cả thi xong" />
            </RadioGroup>
          </StackLabel>

          <StackLabel>
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
          </StackLabel>

          <StackLabel>
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
          </StackLabel>

          <StackLabel>
            <Box>Cách tính điểm</Box>
            <RadioGroup
              row
              name="inputQuestion"
              value={inputQuestion}
              onChange={handleChangeInputQuestion}
            >
              <FormControlLabel value={true} control={<Radio size='small' />} label="Lấy điểm cao nhất" />
              <FormControlLabel value={false} control={<Radio size='small' />} label="Lấy điểm lần thi cuối" />
              <FormControlLabel value={false} control={<Radio size='small' />} label="Lấy điểm trung bình các lần thi" />
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
          <Button variant='contained'>Lưu cấu hình</Button>
        </Stack>
      </Paper>

      <Paper sx={{ marginBottom: '12px' }}>
        <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }}>Danh sách câu hỏi</Typography>
      </Paper>
      {
        questions.map(item =>

          <PaperQuestion key={item.id} elevation={12} >
            <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
              <AccordionSummary sx={AccordionSummaryStyle}
                expandIcon={<ExpandMoreIcon />}
              ><Typography>Câu hỏi 1</Typography>

              </AccordionSummary>
              <AccordionDetails>
                {idQuestion === item.id ?
                  <CreateQuestion edit={true} id={idQuestion}
                    question={item.question}
                    answers={item.answers} /> : <DetailQuestion id={item.id} handleEdit={handleSelectQuestionEdit} />}
              </AccordionDetails>
            </Accordion>
          </PaperQuestion>

        )
      }
      {/* <CreateQuestion edit={false} id='' /> */}
      <Button variant='contained'>Tạo câu hỏi mới</Button>
    </Stack >
  )
}


const questions = [
  {
    id: '1',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
  {
    id: '2',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
  {
    id: '3',
    question: 'Câu hỏi 1',
    answers: [
      {
        id: '1',
        content: "Đáp án 1"
      },
      {
        id: '2',
        content: "Đáp án 2"
      },
      {
        id: '3',
        content: "Đáp án 3"
      },
    ]
  },
]

export default CreateExamination