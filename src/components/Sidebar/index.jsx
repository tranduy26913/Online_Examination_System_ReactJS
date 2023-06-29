import React, { useState } from "react";

import { Link } from "react-router-dom";
import WebhookIcon from '@mui/icons-material/Webhook';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Stack,
  Box,
  Paper,
  Tooltip
} from "@mui/material";

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  // position:'sticky',
  top: '56px',
  borderRight: '1px solid rgba(0,0,0,0.07)',
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
  borderRight: '1px solid rgba(0,0,0,0.07)',
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


const Drawer = styled(MuiDrawer)(
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
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}60`,
    }
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent',
    '& .MuiListItemButton-root': {
      backgroundColor: `${theme.palette.primary.main}a0`,
    },
  }
}))


const Sidebar = (props) => {
  const { Breadcrumbs } = props
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(true)
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setMobileOpen(false);
  }
  const handleDrawerOpen = () => setOpen(true);

  const MyDrawer = () => (
    <>
      <DrawerHeader>
        {
          open ?
            <>
              <ListItem>
                {/* <ListItemAvatar>
                      <Avatar alt="hình đại diện" src={user?.avatar || avatar} />
                    </ListItemAvatar> */}
                {/* <Player
                  autoplay
                  loop
                  style={{ height: '46px', width: '46px' }}
                  src={'https://assets1.lottiefiles.com/private_files/lf30_juqdjgia.json'}
                /> */}
                <WebhookIcon color='primary'/>
                <ListItemText color='primary' primary={props.heading} sx={{ marginLeft:'6px',fontSize: '16px', textTransform: 'uppercase', color: 'primary !important' }} />
              </ListItem>
              <IconButton onClick={handleDrawerClose}>
                {/* <Player
                  autoplay
                  loop
                  src="https://assets6.lottiefiles.com/packages/lf20_mte9qfuj.json"
                  style={{ marginRight: '4px', height: '36px', width: '36px' }}
                /> */}
                 <KeyboardDoubleArrowLeftIcon />
              </IconButton></> :
            <IconButton
              color="inherit"

              onClick={handleDrawerOpen}
            >
              {/* <MyComponent
               src={'https://assets1.lottiefiles.com/private_files/lf30_juqdjgia.json'}
                style={{ height: '52px', width: '52px' }}
              /> */}
              <MenuIcon />
            </IconButton>
        }

      </DrawerHeader>

      <Divider />

      <List>
        {props.sidebarTab.map((item) => (
          <Link key={item.id} to={item.link}>

            <ListItemCustom
              selected={props.selectedTabId === item.id}
              onClick={() => props.handleChangeTab(item.id)}
            >

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2,
                }}
              >

                <Tooltip title={item.text} placement="right">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 1.5 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {<item.icon />}
                  </ListItemIcon>
                </Tooltip>
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
    </>
  )

  return (
    <Box>
      <Stack direction="row" className="customer-account">
        <Drawer variant="permanent" open={open}
          sx={{
            display: { xs: 'none', md: 'block' },

          }}
        >
          <MyDrawer />
          {/* {drawer} */}
        </Drawer>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100%', top: 0 },
          }}
        >
          <MyDrawer />
          {/* {drawer} */}
        </Drawer>

        <Box flex={1} p={2} width={0} key="content-dashboard">
          <Paper elevation={12} sx={{ padding: '8px 12px', marginBottom: '12px' }}>
            <Stack direction='row' alignItems='center'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
              {Breadcrumbs && <Breadcrumbs />}
            </Stack>

          </Paper>
          {props.children}
        </Box>
      </Stack>
    </Box>
  );
}

export default Sidebar;
