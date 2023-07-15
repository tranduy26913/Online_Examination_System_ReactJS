import {
  Box,
  Paper,
  Divider,
  Typography,
  Stack,
  FormControlLabel,
  Switch,
  FormGroup,
  RadioGroup,
  Radio,
  FormHelperText,
  FormControl,
} from '@mui/material'
import { useTheme } from '@mui/system';
import moment from 'moment'
import {
  StackLabel,
  Stack2Column
} from './Component/MUI'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiExamination from 'apis/apiExamination';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { clearQuestion, replaceListQuestion } from 'slices/userSlice';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import ExamContext from './ExamContext';
import LayoutListQuesion from './Component/LayoutListQuesion';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema'
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton';
import { getMessageError } from 'utils';
import Page from 'components/Page';

const CreateExamination = (props) => {
  const theme = useTheme()
  const paramUrl = useParams()

  const [isEdit, setIsEdit] = useState(props.isEdit)
  const [slug, setSlug] = useState(paramUrl.examSlug || '')
  const [id, setId] = useState('')
  const [tracking, setTracking] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [viewAnswer, setViewAnswer] = useState('no')
  const [viewPoint, setViewPoint] = useState('no')
  const [typeofPoint, setTypeofPoint] = useState('max')
  const [status, setStatus] = useState('')
  const [isLimit, setIsLimit] = useState(true)//giới hạn số lần thi
  const [loading, setLoading] = useState(false)//loading button
  const [loadingPublish, setLoadingPublish] = useState(false)//loading button
  const [numberofQuestions, setNumberofQuestions] = useState(0)//số câu hỏi
  const [maxPoints, setMaxPoints] = useState(0)//điểm tối đa

  const user = useSelector(state => state.auth.refreshToken)
  const { courseId, id: courseobjId } = useContext(CourseContext)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleSubmit, setValue, control } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      pinExam: "",
      attemptsAllowed: 1,
      allowOutTab: 2,
      allowOutFace: 2,
      numberofQuestions: 0,
      maxTimes: 10,
      startTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      endTime: moment(new Date()).add(10, 'minutes').format("YYYY-MM-DDTHH:mm")
    }
  });

  useEffect(() => {
    const getQuestions = () => {
      if (!user) return
      if (!slug) return
      apiExamination.getExaminationBySlug(slug)
        .then(res => {
          try {
            const exam = res
            dispatch(clearQuestion())
            setValue('name', exam.name)

            setValue('maxTimes', exam.maxTimes)
            setValue('pinExam', exam.pin)
            //setValue('numberofQuestions', exam.numberofQuestions)
            setTracking(exam.tracking)
            setViewAnswer(exam.viewAnswer)
            setViewPoint(exam.viewPoint)
            setTypeofPoint(exam.typeofPoint)
            setShuffle(exam.shuffle)
            setStatus(exam.status)
            setNumberofQuestions(exam.numberofQuestions)
            setMaxPoints(exam.maxPoints)
            if (exam.attemptsAllowed === 0)
              setIsLimit(false)
            else
              setValue('attemptsAllowed', exam.attemptsAllowed)
            setId(exam.id || exam._id)
            if (new Date(exam.startTime).toLocaleString() !== "Invalid Date")
              setValue('startTime', moment(exam.startTime).format("YYYY-MM-DDTHH:mm"))

            if (new Date(exam.endTime).toLocaleString() !== "Invalid Date")
              setValue('endTime', moment(exam.endTime).format("YYYY-MM-DDTHH:mm"))
            dispatch(replaceListQuestion(exam.questions.map(e => e.question)))
          }
          catch (err) {
          }
        })

    }
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, user])

  const reloadExam = useCallback(() => {
    apiExamination.getExaminationBySlug(slug)
      .then(res => {
        try {
          const exam = res
          setNumberofQuestions(exam.numberofQuestions)
          setMaxPoints(exam.maxPoints)
          dispatch(replaceListQuestion(exam.questions.map(e => e.question)))
        }
        catch (err) {
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])


  const handleChangeViewAnswer = event => setViewAnswer(event.target.value)
  const handleChangeViewPoint = event => setViewPoint(event.target.value)
  const handleChangeTypeofPoint = event => setTypeofPoint(event.target.value)

  const handleCreate = (data) => {
    const { name, startTime, endTime, maxTimes, attemptsAllowed, pinExam, allowOutTab, allowOutFace } = data

    const params = {
      name,
      numberofQuestion: 0,
      courseId: courseobjId,
      description: '',
      tracking,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      attemptsAllowed: isLimit ? attemptsAllowed : 0,
      maxTimes,
      shuffle,
      typeofPoint,
      viewPoint,
      viewAnswer,
      pin: pinExam,
      allowOutTab,
      allowOutFace
    }
    setLoading(true)
    apiExamination.createExam(params)
      .then(res => {
        toast.success("Tạo đề thi thành công")
        navigate(`/course/${courseId}/detail-exam/${res.slug}`)
        setSlug(res.slug)
        setIsEdit(true)
        setStatus('private')
      })
      .catch(err => {
        toast.warning(getMessageError(err) || "Tạo đề thi không thành công")
      })
      .finally(() => setLoading(false))
  }

  const handleUpdate = (data) => {
    const { name, startTime, endTime, maxTimes, attemptsAllowed, pinExam, allowOutTab, allowOutFace } = data

    const params = {
      id,
      name,
      courseId: courseobjId,
      description: '',
      tracking,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      attemptsAllowed: isLimit ? attemptsAllowed : 0,
      maxTimes,
      shuffle,
      typeofPoint,
      viewPoint,
      viewAnswer,
      pin: pinExam,
      allowOutTab,
      allowOutFace
    }
    setLoading(true)
    apiExamination.updateExam(params)
      .then(res => {
        toast.success("Cập nhật cấu hình đề thi thành công")
        //navigate(`/course/${courseId}/detail-exam/${res.slug}`)
      })
      .finally(() => setLoading(false))
  }

  const handleChangeStatus = () => {
    const params = {
      id
    }
    setLoadingPublish(true)
    let request = apiExamination.PublishExam(params)
    if (status === 'public')
      request = apiExamination.CloseExam(params)
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

  return (
    <Page title="Đề thi">

      <Stack spacing={1}>
        <Paper elevation={12} sx={{ padding: '12px' }}>
          <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }} >
            Thông tin đề thi
          </Typography>

          <Divider />

          <Stack spacing={1.5} my={1.5}>
            <StackLabel>
              <Box>Tên đề thi</Box>
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

            <Stack2Column>
              <StackLabel>
                <Box>Thời lượng làm bài (phút)</Box>
                <FormControl>
                  <Controller
                    name={"maxTimes"}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <input
                          {...field}
                          type='number' min={1}
                        />
                        {error && <FormHelperText>{error.message}</FormHelperText>}
                      </>
                    )}
                  />
                </FormControl>
              </StackLabel>

              <StackLabel>
                <Box>Mật khẩu đề thi</Box>
                <FormControl>
                  <Controller
                    name={"pinExam"}
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

            {
              tracking &&
              <Stack2Column>
                <StackLabel>
                  <Box>Số lượt thoát Tab</Box>
                  <FormControl>
                    <Controller
                      name={"allowOutTab"}
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
                  <Box>Số lượt thoát camera</Box>
                  <FormControl>
                    <Controller
                      name={"allowOutFace"}
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
              </Stack2Column>
            }
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


            <StackLabel>
              <Box className='LabelFormControl'>Cho xem đáp án</Box>
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
              <Box className='LabelFormControl'>Cho xem điểm</Box>
              <RadioGroup
                row
                name="viewPoint"
                value={viewPoint}
                onChange={handleChangeViewPoint}
              >
                <FormControlLabel value="no" control={<Radio size='small' />} label="Không" />
                <FormControlLabel value="done" control={<Radio size='small' />} label="Khi thi xong" />
                <FormControlLabel value="alldone" control={<Radio size='small' />} label="Khi tất cả thi xong" />
              </RadioGroup>
            </StackLabel>

            <StackLabel>
              <Box className='LabelFormControl'>Cách tính điểm</Box>
              <RadioGroup
                row
                name="typeofPoint"
                value={typeofPoint}
                onChange={handleChangeTypeofPoint}
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
                  <FormControl>
                    <Controller
                      name={"attemptsAllowed"}
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
              }
            </Stack2Column>


            {
              isEdit &&
              <Stack2Column>
                <StackLabel>
                  <Box>Số câu hỏi</Box>
                  <FormControl>
                    <input
                      value={numberofQuestions}
                      disabled
                    />
                  </FormControl>
                </StackLabel>
                <StackLabel>
                  <Box>Điểm tối đa</Box>
                  <FormControl>
                    <input
                      value={maxPoints}
                      disabled
                    />
                  </FormControl>
                </StackLabel>
              </Stack2Column>
            }

          </Stack>

          <Stack direction='row' justifyContent='center' spacing={2}>
            <LoadingButton variant='contained' loading={loading}
              onClick={isEdit ? handleSubmit(handleUpdate) : handleSubmit(handleCreate)}>Lưu cấu hình</LoadingButton>
            {status && status !== 'close' && <LoadingButton
              variant='contained'
              loading={loadingPublish}
              color={status === 'private' ? 'primary' : 'warning'}
              onClick={handleChangeStatus}>{status === 'private' ? 'Xuất bản' : 'Đóng bài thi'}</LoadingButton>}
          </Stack>
        </Paper>
        {
          isEdit &&
          <ExamContext.Provider value={{ examId: id, status: status, reloadExam }}>
            <LayoutListQuesion />
          </ExamContext.Provider>
        }

      </Stack >
    </Page>
  )
}

export default CreateExamination