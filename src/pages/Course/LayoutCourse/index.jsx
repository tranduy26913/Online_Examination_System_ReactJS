import React from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { SIDEBAR_COURSE_TEACHER, SIDEBAR_COURSE_STUDENT } from "constraints/StudentDashboard";

import {
  Button,
  Stack,
  Typography,
  Breadcrumbs,
  Paper,
  Box,

} from "@mui/material";

import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import EditIcon from '@mui/icons-material/Edit'
import { Outlet } from 'react-router-dom'
import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import apiCourse from "apis/apiCourse";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCallback } from "react";
import './ListTest.scss'
import CourseContext from "./CourseContext";
import { useSelector } from "react-redux";
import ExitCourse from "./ExitCourse";
import ShareTray from "components/ShareTray";
import LinearProgressWithLabel from "components/LinearProgressWithLabel";
import { getMessageError } from "utils";
//import { CSSTransition } from 'react-transition-group';

const checkSelectedTab = (item, pathname) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 0)
    return false
  const regex = new RegExp(item.regex)
  return regex.test(pathname)
}

const LayoutCourse = () => {
  const location = useLocation()
  const role = useSelector(state => state.setting.role)
  const [course, setCourse] = useState({})
  const [sidebarCourse, setSidebarCourse] = useState((role && role === 'teacher' && SIDEBAR_COURSE_TEACHER) || SIDEBAR_COURSE_STUDENT)
  const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 1);
  const navigate = useNavigate()

  const { courseId } = useParams()

  const handleChangeTab = useCallback(id => setSelectedTabId(id), [])

  useEffect(() => {
    const loadCourse = () => {
      if (!courseId)//Nếu không có id course
      {
        navigate('/my/list-course')
        toast.warning("Khoá học không xác định")
      }
      apiCourse.getCourseByCourseID({ courseId },role)
        .then(res => {
          setCourse(res)
        })
        .catch(err => {
          console.log(getMessageError(err))
          if(getMessageError(err)==='Học viên Không thuộc khoá học!'){
            toast.warning("Học viên Không thuộc khoá học!")
            navigate(`/enroll/${courseId}`)
          }
          else{
            navigate('/my/list-course')
            toast.warning("Khoá học không xác định")
          }
        })
    }
    loadCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (role === 'teacher')
      setSidebarCourse(SIDEBAR_COURSE_TEACHER)
    else {
      setSidebarCourse(SIDEBAR_COURSE_STUDENT)
    }
  }, [role])

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    handleChangePath()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, sidebarCourse])


  const DashboardBreadcrumbs = () => {
    const tab = sidebarCourse.find(item => item.id === selectedTabId)
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ fontSize: "14px" }}
      //
      >
        <Link key="1" to="/">
          <Typography >
            Trang chủ
          </Typography>
        </Link>
        <Link key="2" to="/my/list-course">
          <Typography>
            Danh sách khoá học
          </Typography>
        </Link>
        <Link key="3" to={`/course/${courseId}`}>
          <Typography>
            {course?.name}
          </Typography>
        </Link>
        <Link key="4" to={`/course/${courseId}/${tab?.link}`}>
          <Typography>
            {tab?.text || ""}
          </Typography>
        </Link>
      </Breadcrumbs>)
  }

  React.useEffect(() => {
    document.title =
      sidebarCourse.find(item => item.id === selectedTabId)?.text ||
      "Bello Quiz";
  }, [selectedTabId]);

  const UpdateProcessing = ()=>{
    apiCourse.getCourseByCourseID({ courseId },role)
        .then(res => {
          setCourse(res)
        })
  }

  return (
    <Sidebar sidebarTab={sidebarCourse} selectedTabId={selectedTabId}
      handleChangeTab={handleChangeTab}
      heading={'Khoá học'}
      Breadcrumbs={DashboardBreadcrumbs}>
      <CourseContext.Provider value={{ id: course?.id || "", courseId: courseId || "" ,UpdateProcessing:UpdateProcessing}}>
        <Paper elevation={12}>

          <Stack direction={{ xs: 'column', sm: 'row' }} className='listtest__course'>
            <Stack flex={1} p='0 10px' width={{ xs: '60%' }} m={'auto'} sx={{ borderRadius: '10px' }}>
              <img alt='' src={course.image} />
            </Stack>
            <Stack px={2} flex={{ xs: 1, sm: 2, lg: 3 }} direction='row' alignItems='flex-start'>
              <Stack flex={1} spacing={1}>
                <Typography
                  fontSize={'18px'}
                  color='primary'
                >Khoá học: {course?.name}</Typography>
                <Typography >{course?.description}</Typography>
                <Typography >Số lượng bài kiểm tra: {course?.exams?.length}</Typography>
                <Stack flex={1} direction={{ xs: 'column', sm: 'row' }}

                  spacing={2} justifyContent='flex-start' alignItems='center' >
                  {
                    role === 'teacher' &&
                    <Link to={`/my/list-course/edit-course/${courseId}`}>
                      <Button
                        variant='outlined'
                        endIcon={<EditIcon />}
                      >Chỉnh sửa</Button>
                    </Link>
                  }
                  <ShareTray url={`https://oes.vercel.app/enroll/${courseId}`}
                    title={"Tham gia khoá học" + `https://oes.vercel.app/enroll/${courseId}`}
                    quote={"Tham gia khoá học "}
                    variant='outlined'
                    endIcon={<SendIcon />}
                    text='Chia sẻ' />
                  {/* <FacebookShareCount  /> */}
                </Stack>
                <Box>
                 {role === 'student' &&<LinearProgressWithLabel value={Math.floor(course?.avg*100 || 0)}/>} 
                </Box>
              </Stack>
              <ExitCourse />
            </Stack>
          </Stack>
        </Paper>

        <Outlet />
      </CourseContext.Provider>

    </Sidebar>
  );
}

export default LayoutCourse;
