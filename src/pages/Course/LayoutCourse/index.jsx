import React from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { SIDEBAR_COURSE_TEACHER, SIDEBAR_COURSE_STUDENT } from "constraints/StudentDashboard";

import {
  Button,
  Stack,
  Box,
  Typography,
  Breadcrumbs,
  Paper
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

  //const paramUrl = useSearchParams()[0]

  const handleChangeTab = useCallback(id => setSelectedTabId(id), [])

  useEffect(() => {
    const loadCourse = () => {
      if (!courseId)//Nếu không có id course
      {
        navigate('/my/list-course')
        toast.warning("Khoá học không xác định")
      }
      apiCourse.getCourseByCourseID({ courseId })
        .then(res => {
          setCourse(res)
        })
        .catch(err => {
          navigate('/my/list-course')
          toast.warning("Khoá học không xác định")
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
        sx={{ fontSize: "14px",color:'#000' }}
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
        <Link key="3" to={`/course/${courseId}/${tab?.link}`}>
        <Typography key="2">
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

  return (
    <Sidebar sidebarTab={sidebarCourse} selectedTabId={selectedTabId}
      handleChangeTab={handleChangeTab}
      heading={'Khoá học'}
      Breadcrumbs={DashboardBreadcrumbs}>
      
      <Paper elevation={24}>

        <Stack direction={{xs:'column',sm:'row'}} className='listtest__course'>
          <Stack flex={1} p='0 10px' width={{xs:'60%'}} m={'auto'} sx={{borderRadius:'10px'}}>
            <img alt='' src={course.image} />
          </Stack>
          <Stack  px={2} flex={{xs:1,sm:2,lg:3}} spacing={1}>
            <Typography
              fontSize={'18px'}
              color='primary'
              >Khoá học: {course?.name}</Typography>
            <Typography >{course?.description}</Typography>
            <Typography >Số lượng bài kiểm tra: {course?.exams?.length}</Typography>
            <Stack flex={1} direction={{xs:'column',sm:'row'}}
            
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
              <Button
                variant='outlined'
                endIcon={<SendIcon />}
              >Chia sẻ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <CourseContext.Provider value={{ id: course?.id || "", courseId: course?.courseId || "" }}>
        <Outlet />
      </CourseContext.Provider>

    </Sidebar>
  );
}

export default LayoutCourse;
