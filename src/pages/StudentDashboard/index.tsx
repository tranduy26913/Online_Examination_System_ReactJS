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
  Divider,
  IconButton,
  Stack,
  Box,
  Typography,
  Breadcrumbs
} from "@mui/material";

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../slices/authSlice";
import Profile from "./Profile";
import ListCourse from "./ListCourse";
import ListTest from "./ListTest";
import CreateExamination from "./CreateExamination";
const avatar = require("../../assets/img/avatar.png")


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  position:'sticky',
  top:0,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  position:'sticky',
  top:0,
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    '& .MuiDrawer-paper::-webkit-scrollbar': {
      width: '6px',
      backgroundColor: '#F5F5F5'
    },
    '& .MuiDrawer-paper::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.light,
      borderRadius: '3px'
    }
  }),
);

const StudentDashboard: React.FC = () => {
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
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);


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
    <Box>

      <Stack direction="row" className="customer-account">
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {
              open ?
                <>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="hình đại diện" src={user?.img || avatar} />
                    </ListItemAvatar>
                    <ListItemText primary="Tài khoản của" secondary={user?.fullName} />
                  </ListItem>
                  <IconButton onClick={handleDrawerClose}>
                    <KeyboardDoubleArrowLeftIcon />
                  </IconButton></> :
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon />
                </IconButton>
            }

          </DrawerHeader>

          <Divider />

          <List>
            {sidebarTab.map((item) => (
              <Link to={item.link}>
                <ListItem
                  key={item.id}
                  disablePadding
                  sx={{ display: "block" }}
                  selected={selectedTabId === item.id}
                  onClick={() => setSelectedTabId(item.id)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<item.icon />}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        
        <Box flex={1} p={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
          sx={{fontSize:"14px",padding:"0px 0px 16px 0px"}}
          //
          >
            {breadcrumbs}
          </Breadcrumbs>
          {/* <Outlet /> */}
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/list-course" element={<ListCourse />} />
            <Route path="/course/list-test" element={<ListTest />} />
            <Route path="/create-exam" element={<CreateExamination />} />
          </Routes>
        </Box>
      </Stack>
    </Box>
  );
}

export default StudentDashboard;
