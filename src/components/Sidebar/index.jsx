import {useState,useEffect} from "react";

import {  Link } from "react-router-dom";

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
} from "@mui/material";

import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

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

const Sidebar = (props) => {
  const [open, setOpen] = useState(true);
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerOpen = () => setOpen(true);

  return (
    <Box>
      <Stack direction="row" className="customer-account">
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {
              open ?
                <>
                  <ListItem>
                    {/* <ListItemAvatar>
                      <Avatar alt="hình đại diện" src={user?.avatar || avatar} />
                    </ListItemAvatar> */}
                    <ListItemText primary={props.heading} sx={{fontSize:'16px'}} />
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
          {props.children}          
        </Box>
      </Stack>
    </Box>
  );
}

export default Sidebar;
