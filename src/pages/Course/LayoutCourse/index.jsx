import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { sidebarCourse } from "constraints/StudentDashboard";

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
import { Outlet, useSearchParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearBreadcrumb } from "slices/breadcrumbSlice";
import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import apiCourse from "apis/apiCourse";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCallback } from "react";
import './ListTest.scss'

const checkSelectedTab = (item, pathname) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 0)
    return false
  return item.list.includes(splitPath[splitPath.length - 1])
}

const LayoutCourse = () => {
  const location = useLocation()
  const [course, setCourse] = useState({})
  const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 0);
  const breadcrumbState = useSelector(state => state.breadcrumb.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const paramUrl = useSearchParams()[0]

  const handleChangeTab = useCallback(id=>setSelectedTabId(id),[])

  useEffect(() => {
    const loadCourse = () => {
      if (!paramUrl.get("id"))//Nếu không có id course
      {
        
        navigate('/list-course')
        toast.warning("Khoá học không xác định")
      }
      apiCourse.getCourses({
        id: paramUrl.get("id")
      })
        .then(res => {
          setCourse(res[0])
        })
        .catch(err => {
          navigate('/list-course')
          toast.warning("Khoá học không xác định")
        })
    }
    //loadCourse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarCourse.find(item => checkSelectedTab(item, location.pathname))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    const removeBreadcrumb = () => {
      dispatch(clearBreadcrumb())
    }
    handleChangePath()
    removeBreadcrumb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const breadcrumbs = (() => {
    let tmp = []
    if (breadcrumbState.length > 0) {
      tmp = breadcrumbState.map(item =>
        <Link key={item.path} to="/">
          <Typography>
            {item.display}
          </Typography>
        </Link>
      )
    }

    return ([
      <Link key="1" to="/">
        <Typography>
          Trang chủ
        </Typography>
      </Link>,
      <Typography key="2">
        {sidebarCourse.find(item => item.id === selectedTabId)?.text || ""}
      </Typography>,
      ...tmp
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
            <img alt='' src="https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg" />
          </Box>
          <Stack spacing={1} className='listtest__wrap-info'>
            <Typography
              fontSize={'18px'}
              color='primary'
              className='listtest__course-name'>Khoá học: Học máy </Typography>
            <Typography className='listtest__course-desc'>Cuộc thi học thuật trực tuyến </Typography>
            <Typography className='listtest__course-desc'>Số lượng bài kiểm tra: 8</Typography>
            <Stack flex={1} justifyContent='flex-end' alignItems='flex-start'>
              <Button
                variant='outlined'
                endIcon={<SendIcon />}
              >Chia sẻ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
      <Outlet />
    </Sidebar>
  );
}

export default LayoutCourse;
