import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";

import { sidebarTab } from "../../constraints/StudentDashboard";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  Box,
  Typography,
  Breadcrumbs
} from "@mui/material";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../slices/authSlice";
const avatar = require("../../assets/img/avatar.png")
const TeacherDashboard: React.FC = () => {
  const location = useLocation()
  const tabId = sidebarTab.find(item => location.pathname.includes(item.link))

  const [selectedTabId, setSelectedTabId] = React.useState<number>(tabId?.id || 0);
  const user = useAppSelector(selectUser)
  const breadcrumbs = [
    <Link key="1" color="inherit" to="/" style={{ fontSize: "14px" }}>
      Trang chủ
    </Link>,
    <Typography key="2" color="text.primary" fontSize="14px">
      {sidebarTab.find(item => item.id === selectedTabId)?.text || ""}
    </Typography>,
  ];//

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarTab.find(item => location.pathname.includes(item.link))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    handleChangePath()
  }, [location.pathname])
  React.useEffect(() => {
    document.title =
      sidebarTab.find(item => item.id === selectedTabId)?.text ||
      "Tiki - Mua hàng online, giá tốt, hàng chuẩn, ship nhanh";
  }, [selectedTabId]);
  return (
    <Box className="container">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        //p="16px 16px 8px"
      //fontSize="14px"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Box className="customer-account">
        <Box width="16rem">
          <List sx={{ maxWidth: "300px" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt="hình đại diện" src={user?.img || avatar} />
              </ListItemAvatar>
              <ListItemText primary="Tài khoản của" secondary={user?.fullName} />
            </ListItem>

            {sidebarTab.map((item, index) => {
              return (
                <Link key={item.id} to={item.link}>
                  <ListItem

                    disablePadding
                    onClick={() => setSelectedTabId(item.id)}
                    selected={selectedTabId === item.id}
                  >
                    <ListItemButton>
                      <ListItemIcon>{<item.icon />}</ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                      {index === 1 ? (
                        <Badge badgeContent="3" color="error"></Badge>
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
          </List>
        </Box>
        <Box flex={1} mt="16px">
          {/* <Outlet /> */}
          <Routes>

          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default TeacherDashboard;
