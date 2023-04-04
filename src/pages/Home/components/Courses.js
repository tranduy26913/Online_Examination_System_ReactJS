import { Typography, Button, Stack, Box, Card, CardMedia, Paper, IconButton, useMediaQuery, useTheme, Skeleton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment'
import SendIcon from '@mui/icons-material/Send'
import ShareTray from 'components/ShareTray';
import apiCourse from 'apis/apiCourse';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const CoursesInHome = () => {
  const [courses, setCourses] = useState([])
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const lgScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const sizeCarousel = smScreen ? 1 : mdScreen ? 2 : lgScreen ? 3 : 4
  const slidersRef = useRef(null)
  const refreshToken = useSelector(state => state.auth?.refreshToken)
  const navigate = useNavigate()
  useEffect(() => {
    apiCourse.getCoursesPublic()
      .then(res => {
        if (Array.isArray(res)) {
          setCourses(res)
        }
      })

  }, [])

  const handlePrev = () => {
    const sliderElement = slidersRef.current
    for (let i = 0; i < sizeCarousel; i++) {
      sliderElement.prepend(sliderElement.lastElementChild);
    }
    sliderElement.style.transition = 'none';
    sliderElement.style.transform = 'translateX(-100%)';
    setTimeout(function () {
      sliderElement.style.transition = 'all 0.5s';
      sliderElement.style.transform = 'translateX(0%)';
    })
  }
  const handleNext = () => {
    const sliderElement = slidersRef.current

    for (let i = 0; i < sizeCarousel; i++) {
      let newNode = sliderElement.children[i].cloneNode(true)
      newNode.ariaValueNow = 1 + Number(sliderElement.lastElementChild.ariaValueNow)
      sliderElement.appendChild(newNode);
    }
    sliderElement.style.transition = 'all 0.5s';
    sliderElement.style.transform = 'translateX(-100%)';

    setTimeout(function () {
      for (let i = 0; i < sizeCarousel; i++) {
        sliderElement.removeChild(sliderElement.firstElementChild);
      }
      sliderElement.style.transition = 'none';
      sliderElement.style.transform = 'translate(0)';
    }, 500)
  }

  const onClickDetail = (courseId) => {
    if (refreshToken)
      navigate(`/course/${courseId}`)
    else
      toast.info('Vui lòng đăng nhập để truy cập vào khoá học')
  }

  return (
    <Stack width='100%' mb={8} justifyContent='center' alignItems='center' spacing={2}>
      <Typography align='center' color='primary' fontSize='28px'>Khám phá các khoá học trong Bello Quiz</Typography>
      <Paper sx={{ margin: '0 16px', width: '100%', padding: '24px', position: 'relative' }} elevation={6}>
        <Stack justifyContent='center' alignItems='center' spacing={2}
          sx={{ overflow: 'hidden' }}>
          <Stack ref={slidersRef} direction='row'
            sx={{ width: '100%' }}
          >

            {
              courses.length === 0 ?
                [1, 2, 3, 4].map((item, index) =>
                  <Box sx={{
                    flex: 1,
                    padding: '0 4px',
                    minWidth: {
                      xs: '100%', sm: '50%', md: '33.33%', lg: '25%'
                    }
                  }} aria-valuenow={index} key={index}>

                    <Skeleton variant="rounded" width='100%' animation="wave" height={170} />
                    <Skeleton variant="rounded" width='100%' animation="wave" height={26} />
                    <Skeleton variant="rounded" width='100%' animation="wave" height={44} />
                  </Box>)
                :
                courses.map((course, index) =>
                  <Box sx={{
                    flex: 1,
                    padding: '0 4px',
                    minWidth: {
                      xs: '100%', sm: '50%', md: '33.33%', lg: '25%'
                    }
                  }} aria-valuenow={index} key={course._id}>

                    <Card className='hover-element' sx={{ border: "1px solid #00e67660", height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="170"
                        width="180"
                        image={course.image || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                        onError={e => {
                          e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                        }}
                        alt="image course"
                      />
                      <Link to={`/course/${course.courseId}`}>
                        <Typography color="primary" variant="h5" component="div" className='text-overflow-1-lines'
                          sx={{
                            textAlign: "center",
                          }}>
                          {course.name}
                        </Typography>
                      </Link>
                      <Stack
                        p='0.5rem'
                        direction='row'
                        justifyContent="center"
                        sx={{ flexWrap: 'wrap' }}
                        gap={1.5}>
                        {/* <Link to={`/course/${course.courseId}`}> */}
                        <Button
                          onClick={() => onClickDetail(course.courseId)}
                          variant="outlined"
                          size="small"
                          endIcon={<AssignmentIcon />}
                        >Chi tiết</Button>
                        {/* </Link> */}
                        <ShareTray quote={course.name} title={course.name}
                          url={`https://oes.vercel.app/enroll-course/${course.courseId}`}
                          text='Chia sẻ' variant="outlined" size="small"
                          endIcon={<SendIcon />} />
                      </Stack>
                    </Card>
                  </Box>

                )}

          </Stack>

        </Stack>
        <IconButton onClick={handlePrev} color="primary" className='prevButton'>
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton onClick={handleNext} color="primary" className='nextButton'>
          <ArrowForwardIosIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default CoursesInHome;