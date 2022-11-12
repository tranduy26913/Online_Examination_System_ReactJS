import { useCallback, useState, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";


import {
  Typography,
  Breadcrumbs,
  Paper
} from "@mui/material";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Outlet } from 'react-router-dom'
import Sidebar from "components/Sidebar";


const checkSelectedTab = (item, pathname) => {
  const splitPath = pathname.split('/')
  if (splitPath.length === 0)
    return false
  const regex = new RegExp(item.regex)
  return regex.test(pathname)
}
const StudentDashboard = (props) => {
  const location = useLocation()
  const tabId = props.sidebarTab.find(item => checkSelectedTab(item, location.pathname))

  const [selectedTabId, setSelectedTabId] = useState(tabId?.id || 0);
  const handleChangeTab = useCallback(id => setSelectedTabId(id), [])

  const DashboardBreadcrumbs = () => {
    const tab = props.sidebarTab.find(item => item.id === selectedTabId)
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ fontSize: "14px" }}
      //
      >
        <Link key="1" to="/">
          <Typography>
            Trang chủ
          </Typography>
        </Link>,
        <Link key="2" to={tab?.link || "/"}>
          {tab?.text || ""}
        </Link>

      </Breadcrumbs>)
  }

  useEffect(() => {
    const handleChangePath = () => {
      const tabId = props.sidebarTab.find(item => checkSelectedTab(item, location.pathname))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }

    handleChangePath()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, props.sidebarTab])

  useEffect(() => {
    document.title =
      props.sidebarTab.find(item => item.id === selectedTabId)?.text ||
      "Bello Quiz";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTabId]);
  return (
    <Sidebar
      sidebarTab={props.sidebarTab}
      selectedTabId={selectedTabId}
      handleChangeTab={handleChangeTab}
      Breadcrumbs = {DashboardBreadcrumbs}
      heading={"Dashboard"}>
      <Outlet />
    </Sidebar>
  );
}

export default StudentDashboard;
