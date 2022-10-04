import React from "react";

import {  Link, useLocation } from "react-router-dom";

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
  Breadcrumbs,
  Paper
} from "@mui/material";

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { clearBreadcrumb } from "slices/breadcrumbSlice";
const avatar = require("../../assets/img/avatar.png")


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  // position:'sticky',
  top: '56px',
  height: 'calc(100% - 56px)'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  top: '56px',
  height: 'calc(100% - 56px)'
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

const ListItemCustom = styled(ListItem)(({ theme }) => ({
  display: 'block',
  padding: '8px',
  '& .MuiListItemButton-root': {
    borderRadius: '8px',
    '&:hover':{
      backgroundColor: `${theme.palette.primary.main}60`,
    }
  },
  '&.Mui-selected': {
    backgroundColor:'transparent',
    '& .MuiListItemButton-root': {
      backgroundColor: `${theme.palette.primary.main}a0`,
    },
  }
}))

const StudentDashboard = () => {
  const location = useLocation()
  const tabId = sidebarTab.find(item => location.pathname.includes(item.link))

  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 0);
  const user = useSelector(state => state.auth.user)
  const breadcrumbState = useSelector(state => state.breadcrumb.value)
  const dispatch = useDispatch()
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
        {sidebarTab.find(item => item.id === selectedTabId)?.text || ""}
      </Typography>,
      ...tmp
    ]);//
  })()

  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);


  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarTab.find(item => location.pathname.includes(item.link))
      if (tabId)
        setSelectedTabId(tabId?.id || 0)
    }
    const removeBreadcrumb = ()=>{
      dispatch(clearBreadcrumb())
    }
    handleChangePath()
    removeBreadcrumb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  React.useEffect(() => {
    document.title =
      sidebarTab.find(item => item.id === selectedTabId)?.text ||
      "Bello Quiz";
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
                      <Avatar alt="hình đại diện" src={user?.avatar || avatar} />
                    </ListItemAvatar>
                    <ListItemText primary="Tài khoản của" secondary={user?.fullname} />
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
              <Link key={item.id} to={item.link}>
                <ListItemCustom

                  selected={selectedTabId === item.id}
                  onClick={() => setSelectedTabId(item.id)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1.5 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {<item.icon />}
                    </ListItemIcon>

                    <ListItemText
                      secondary={item.text}
                      sx={{
                        opacity: open ? 1 : 0,
                        '& .MuiTypography-root': {
                          fontWeight: 500
                        }
                      }}
                    />
                  </ListItemButton>
                </ListItemCustom>
              </Link>
            ))}
          </List>
        </Drawer>

        <Box flex={1} p={2}>
          <Paper elevation={24} sx={{ padding: '8px 12px', marginBottom: '12px' }}>

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ fontSize: "14px" }}
            //
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Paper>
          <Outlet />
          {/* <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/list-course" element={<ListCourse />} />
            <Route path="/course/list-test" element={<ListTest />} />
            <Route path="/create-exam" element={<CreateExamination />} />
          </Routes> */}
        </Box>
      </Stack>
    </Box>
  );
}

export default StudentDashboard;
