import { useCallback, useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";


import {
  Typography,
  Breadcrumbs,
  Paper
} from "@mui/material";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearBreadcrumb } from "slices/breadcrumbSlice";
import Sidebar from "components/Sidebar";


const checkSelectedTab = (item, pathname) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 0)
    return false
  return item.list.includes(splitPath[splitPath.length - 1])
}
const StudentDashboard = (props) => {
  const location = useLocation()
  const tabId = props.sidebarTab.find(item => checkSelectedTab(item, location.pathname))

  const [selectedTabId, setSelectedTabId] = useState(tabId?.id || 0);
  const breadcrumbState = useSelector(state => state.breadcrumb.value)
  const dispatch = useDispatch()
  const handleChangeTab = useCallback(id => setSelectedTabId(id), [])

  const breadcrumbs = (() => {
    const tab = props.sidebarTab.find(item => item.id === selectedTabId)
    return ([
      <Link key="1" to="/">
        <Typography>
          Trang chủ
        </Typography>
      </Link>,
      <Link key="2"  to={tab?.link || "/"}>
        {tab?.text || ""}
      </Link>
    ]);//
  })()

  useEffect(() => {
    const handleChangePath = () => {
      const tabId = props.sidebarTab.find(item => checkSelectedTab(item, location.pathname))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    const removeBreadcrumb = () => {
      dispatch(clearBreadcrumb())
    }
    handleChangePath()
    removeBreadcrumb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, props.sidebarTab])

  useEffect(() => {
    document.title =
      props.sidebarTab.find(item => item.id === selectedTabId)?.text ||
      "Bello Quiz";
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId]);
  return (
    <Sidebar sidebarTab={props.sidebarTab}
     selectedTabId={selectedTabId}
      handleChangeTab={handleChangeTab}
      heading={"Dashboard"}>
      <Paper elevation={12} sx={{ padding: '8px 12px', marginBottom: '12px' }}>

        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ fontSize: "14px" }}
        //
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Paper>
      <Outlet />
    </Sidebar>
  );
}

export default StudentDashboard;
