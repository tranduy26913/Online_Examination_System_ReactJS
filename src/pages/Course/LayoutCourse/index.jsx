import React from "react";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { SIDEBAR_COURSE_TEACHER,SIDEBAR_COURSE_STUDENT } from "constraints/StudentDashboard";

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

const checkSelectedTab = (item, pathname) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 0)
    return false
  return item.list.includes(splitPath[splitPath.length - 1])
}

const LayoutCourse = () => {
  const location = useLocation()
  const [course, setCourse] = useState({})
  const [sidebarCourse, setSidebarCourse] = useState(SIDEBAR_COURSE_STUDENT)
  const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 1);
  const navigate = useNavigate()
  const role = useSelector(state=>state.setting.role)
  const { courseId } = useParams()

  //const paramUrl = useSearchParams()[0]

  const handleChangeTab = useCallback(id => setSelectedTabId(id), [])

  useEffect(() => {
    const loadCourse = () => {
      if (!courseId)//Nếu không có id course
      {
        navigate('/list-course')
        toast.warning("Khoá học không xác định")
      }
      apiCourse.getCourseByCourseID({ courseId })
        .then(res => {
          setCourse(res)
        })
        .catch(err => {
          navigate('/list-course')
          toast.warning("Khoá học không xác định")
        })
    }
    loadCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(()=>{
    if(role==='teacher')
      setSidebarCourse(SIDEBAR_COURSE_TEACHER)
    else{
      setSidebarCourse(SIDEBAR_COURSE_STUDENT)
    }
  },[role])

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    handleChangePath()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const breadcrumbs = (() => {


    return ([
      <Link key="1" to="/">
        <Typography>
          Trang chủ
        </Typography>
      </Link>,
      <Link key="1" to="/my/list-course">
        <Typography>
          Danh sách khoá học
        </Typography>
      </Link>,
      <Typography key="2">
        {sidebarCourse.find(item => item.id === selectedTabId)?.text || ""}
      </Typography>,
    ]);//
  })()

  React.useEffect(() => {
    document.title =
      sidebarCourse.find(item => item.id === selectedTabId)?.text ||
      "Bello Quiz";
  }, [selectedTabId]);

  return (
    <Sidebar sidebarTab={sidebarCourse} selectedTabId={selectedTabId}
      handleChangeTab={handleChangeTab}
      heading={'Khoá học'}>
      <Paper elevation={24} sx={{ padding: '8px 12px', marginBottom: '12px' }}>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ fontSize: "14px" }}
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Paper>
      <Paper elevation={24}>

        <Stack direction='row' className='listtest__course'>
          <Box className='listtest__wrap-img'>
            <img alt='' src={course.image || "https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg"} />
          </Box>
          <Stack spacing={1} className='listtest__wrap-info'>
            <Typography
              fontSize={'18px'}
              color='primary'
              className='listtest__course-name'>Khoá học: {course?.name}</Typography>
            <Typography className='listtest__course-desc'>{course?.description}</Typography>
            <Typography className='listtest__course-desc'>Số lượng bài kiểm tra: {course?.exams?.length}</Typography>
            <Stack flex={1} justifyContent='flex-end' alignItems='flex-start'>
              <Button
                variant='outlined'
                endIcon={<SendIcon />}
              >Chia sẻ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <CourseContext.Provider value={{ id: course?.id || "",courseId:course?.courseId || "" }}>
        <Outlet />
      </CourseContext.Provider>

    </Sidebar>
  );
}

export default LayoutCourse;
