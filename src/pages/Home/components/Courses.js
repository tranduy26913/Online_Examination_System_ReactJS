import { Typography, Button, Stack, Box, Card, CardMedia, Paper, IconButton, Pagination, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment'
import SendIcon from '@mui/icons-material/Send'
import ShareTray from 'components/ShareTray';
import apiCourse from 'apis/apiCourse';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const CoursesInHome = () => {
  const [courses, setCourses] = useState([])
  const [direction, setDirection] = useState(1)
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const lgScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const sizeCarousel = smScreen ? 1 : mdScreen ? 2 : lgScreen ? 3 : 4
  console.log(sizeCarousel)
  //const [re] = useMediaQuery(theme.breakpoints.up('sm'));
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(8)
  const slidersRef = useRef(null)

  const handleChangePage = (event, value) => {
    setPage(value);
  };


  useEffect(() => {

    // apiCourse.getCoursesPublic()
    //   .then(res => {
    //     if (Array.isArray(res)) {

    //       setCourses(res)
    //     }
    //   })
    setCourses([
      {
        "_id": "635510ef9612cc2a7965f3af",
        "name": "Học máy",
        "description": "Khoá học cung cấp kiến thức về môn học máy",
        "startTime": "2022-11-01T06:41:47.000Z",
        "endTime": "2023-08-24T06:41:47.000Z",
        "creatorId": "635426f6f8f9228bbf90fec7",
        "slug": "hoc-may-trME0s1",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1668242309/course/635510ef9612cc2a7965f3af.jpg",
        "courseId": 6,
        "createdAt": "2022-10-23T10:01:21.085Z",
        "updatedAt": "2023-03-13T16:56:00.036Z",
        "__v": 59,
        "pin": ""
      },
      {
        "_id": "635514d38d57f21f6f63061d",
        "name": "Lập trình web",
        "description": "Lập trình web",
        "startTime": "2022-11-08T11:20:17.197Z",
        "endTime": "2023-01-07T11:20:17.198Z",
        "creatorId": "635426f6f8f9228bbf90fec7",
        "slug": "lap-trinh-web-8ZM3VLC",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1668240553/course/635514d38d57f21f6f63061d.jpg",
        "courseId": 7,
        "createdAt": "2022-10-23T10:17:58.965Z",
        "updatedAt": "2023-03-07T13:50:13.616Z",
        "__v": 23,
        "pin": ""
      },
      {
        "pin": "",
        "_id": "636745a4205911cdeb5ab73b",
        "name": "Học đi đôi với hành",
        "description": "Học đá abcd",
        "startTime": "2022-10-23T10:17:32.292Z",
        "endTime": "2022-12-22T10:17:32.293Z",
        "creatorId": "63647015f7524e9a3d46568b",
        "slug": "hoc-da-dEz9aiYz",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1666520280/course/635514d38d57f21f6f63061d.jpg",
        "courseId": 8,
        "createdAt": "2022-10-23T10:17:58.965Z",
        "updatedAt": "2022-10-24T20:30:25.574Z",
        "__v": 19
      },
      {
        "_id": "6373e27b2fc16e07ded64066",
        "name": "Lịch sử THPTQG",
        "description": "Ôn tập môn lịch sử cho kì thi THPTQG",
        "startTime": "2022-11-15T19:02:44.552Z",
        "endTime": "2023-01-30T19:02:44.000Z",
        "creatorId": "635426f6f8f9228bbf90fec7",
        "slug": "lich-su-thptqg-Y0c5EQf",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1668539060/course/6373e27b2fc16e07ded64066.png",
        "courseId": 5,
        "createdAt": "2022-11-15T19:03:23.550Z",
        "updatedAt": "2022-12-26T18:57:55.781Z",
        "__v": 8,
        "pin": ""
      },
      {
        "_id": "638651168da832aa441f5c12",
        "name": "Toán 1",
        "description": "Toán Cơ sở 1",
        "startTime": "2022-11-29T18:25:12.430Z",
        "endTime": "2023-01-28T18:25:12.430Z",
        "creatorId": "63647015f7524e9a3d46568b",
        "slug": "toan-1-W5FyTH6",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1669746966/course/638651168da832aa441f5c12.jpg",
        "pin": "",
        "courseId": 10,
        "createdAt": "2022-11-29T18:36:07.811Z",
        "updatedAt": "2022-11-29T18:48:37.424Z",
        "__v": 1
      },
      {
        "_id": "638763f814a4aa712674c985",
        "name": "Khoá học pha chế",
        "description": "Khoá học pha chế dành cho người mới",
        "startTime": "2022-11-30T14:08:08.200Z",
        "endTime": "2023-01-29T14:08:08.200Z",
        "creatorId": "6387630114a4aa712674c972",
        "slug": "khoa-hoc-pha-che-ISAKpW7",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1669817336/course/638763f814a4aa712674c985.jpg",
        "pin": "",
        "courseId": 11,
        "createdAt": "2022-11-30T14:08:57.655Z",
        "updatedAt": "2022-11-30T14:09:36.786Z",
        "__v": 1
      },
      {
        "_id": "639edfaed8d7469839bbdc3a",
        "name": "HTML, CSS Cơ bản",
        "description": "Bạn sẽ học được gì?\r\nBiết cách xây dựng giao diện web với HTML, CSS\r\nBiết cách tự học những kiến thức mới\r\nHọc được cách làm UI chỉn chu, kỹ tính",
        "startTime": "2022-12-18T09:36:34.737Z",
        "endTime": "2023-02-16T09:36:34.737Z",
        "creatorId": "63864ae70a8187411deaf616",
        "slug": "html-css-co-ban-Bss6g19",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1671356334/course/639edfaed8d7469839bbdc3a.png",
        "pin": "",
        "courseId": 12,
        "createdAt": "2022-12-18T09:38:54.771Z",
        "updatedAt": "2022-12-25T08:53:00.077Z",
        "__v": 6
      },
      {
        "_id": "63a33951c6b1163863647dfe",
        "name": "Course01",
        "description": "No description",
        "startTime": "2022-12-21T16:49:51.095Z",
        "endTime": "2023-02-19T16:49:51.096Z",
        "creatorId": "63a3382663761d7da2edf091",
        "slug": "course01-1SPGii0",
        "status": "public",
        "image": "",
        "pin": "",
        "courseId": 13,
        "createdAt": "2022-12-21T16:50:25.991Z",
        "updatedAt": "2022-12-21T16:57:30.234Z",
        "__v": 2
      },
      {
        "_id": "63a807f1e6a2f701f4513894",
        "name": "Lập trình Python cơ bản",
        "description": "Lập trình Python cơ bản",
        "startTime": "2022-12-23T17:00:00.000Z",
        "endTime": "2023-12-22T17:00:00.000Z",
        "creatorId": "63864ae70a8187411deaf616",
        "slug": "lap-trinh-python-co-ban-aZibXFi",
        "status": "public",
        "image": "",
        "pin": "",
        "courseId": 14,
        "createdAt": "2022-12-25T08:21:06.345Z",
        "updatedAt": "2022-12-25T08:21:26.005Z",
        "__v": 0
      },
      {
        "_id": "63b680a47a62406dcb91b019",
        "name": "Lập trình web",
        "description": "Khoá học lập trình web",
        "startTime": "2023-01-05T07:46:59.950Z",
        "endTime": "2023-03-06T07:46:59.950Z",
        "creatorId": "63428c02cd5e93a197c4d92f",
        "slug": "lap-trinh-web-nFAM8Tu",
        "status": "public",
        "image": "https://res.cloudinary.com/dboecbvs9/image/upload/v1672904868/course/63b680a47a62406dcb91b019.jpg",
        "pin": "",
        "courseId": 17,
        "createdAt": "2023-01-05T07:47:49.333Z",
        "updatedAt": "2023-01-05T07:49:02.672Z",
        "__v": 2
      },
      {
        "_id": "64073f5f99743836f6347cb6",
        "name": "Oracle DB",
        "description": "Đây là môn toán 1",
        "startTime": "2022-11-01T06:41:47.000Z",
        "endTime": "2023-01-10T06:41:47.000Z",
        "creatorId": "635426f6f8f9228bbf90fec7",
        "slug": "2",
        "status": "public",
        "image": "",
        "pin": "",
        "courseId": 19,
        "createdAt": "2023-03-07T13:42:55.959Z",
        "updatedAt": "2023-03-07T13:51:01.352Z",
        "__v": 3
      }
    ])
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

  return (
    <Stack width='100%' mb={8} justifyContent='center' alignItems='center' spacing={2}>
      <Typography align='center' color='primary' fontSize='28px'>Khám phá các khoá học trong Bello Quiz</Typography>
      <Paper sx={{ margin: '0 16px', width: '100%', padding:'24px',position:'relative'  }} elevation={6}>
        <Stack justifyContent='center' alignItems='center' spacing={2}
          sx={{ overflow: 'hidden'}}>
          <Stack ref={slidersRef} direction='row'
            sx={{ width: '100%' }}
          >

            {courses.map((course, index) =>
              <Box sx={{
                flex: 1,
                padding:'0 4px',
                minWidth: {
                  xs: '100%', sm: '50%', md: '33.33%', lg: '25%'
                }
              }} ariaValueNow={index} key={course._id}>

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
                    <Link to={`/course/${course.courseId}`}>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<AssignmentIcon />}
                      >Chi tiết</Button>
                    </Link>
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