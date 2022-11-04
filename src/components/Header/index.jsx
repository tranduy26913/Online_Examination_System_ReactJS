import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  styled,
  Stack,
  Switch,
  Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from 'slices/authSlice';
import { changeRole, toggleTheme } from 'slices/settingSlice';


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const pages = [
  {
    path: '/',
    display: 'Trang chủ'
  },
  {
    path: '/my/list-course',
    display: 'Khoá học'
  },
  {
    path: '/aboutus',
    display: 'Về chúng tôi'
  }
]
const settings = [
  {
    display: 'Profile',
    path: 'profile'
  },
  {
    display: 'Khoá học',
    path: 'list-course'
  },
];

const AppBarShadow = styled(AppBar)(({ theme }) => ({
  //boxShadow:`0 4px 10px 4px ${theme.palette.primary.main}`
  //backgroundColor:'#fff',
  boxShadow: theme.palette.mode === 'dark' ? 'none' : '0 4px 10px 4px #aaa'
}))

function Header() {
  const role = useSelector(state => state.setting.role)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector(state => state.user.info)
  const isLight = useSelector(state => state.setting.isLight)
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleChangeTheme = () => {
    dispatch(toggleTheme(!isLight))
  }

  const handleChangeRole = (role)=>{
    if(role === 'teacher' || role === 'student'){
      dispatch(changeRole(role))
    }
  }
  const handleLogout = () => {
    dispatch(logoutSuccess())
    setAnchorElUser(null);
  }


  return (

    <AppBarShadow position="sticky" color='primary'>
      <Container maxWidth="xl" >
        <Toolbar disableGutters
          sx={{
            height: '56px',
            minHeight: '56px !important',
            //justifyContent: isDashboard ? 'flex-end' : 'unset',
            alignItems: 'center'
          }}>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bello Quiz
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.display}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Bello Quiz
          </Typography>
          <Box height='100%' alignItems='center' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.path} to={page.path}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#fff', fontWeight: 600, display: 'block' }}
                >
                  {page.display}
                </Button>
              </Link>
            ))}
          </Box>

          <Box><MaterialUISwitch sx={{ m: 1 }} checked={isLight} onChange={handleChangeTheme} /></Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ?
              <>
                <Tooltip title="Open settings">
                  <Stack direction='row' onClick={handleOpenUserMenu} alignItems='center' mr={2} spacing={1}
                    sx={{ cursor: 'pointer' }}>

                    <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={user.avatar} />
                    </IconButton>
                    <Typography>{user.fullname}</Typography>
                  </Stack>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    return (
                      <Link key={setting.path} to={`/my/${setting.path}`}>
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting.display}</Typography>
                        </MenuItem>
                      </Link>

                    )
                  })}
                  {role === 'student' ?
                    <MenuItem onClick={()=>handleChangeRole('teacher')}>
                      <Typography textAlign="center">Vào giao diện giáo viên</Typography>
                    </MenuItem> :
                    <MenuItem onClick={()=>handleChangeRole('student')}>
                      <Typography textAlign="center">Vào giao diện học viên</Typography>
                    </MenuItem>
                  }
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </> :
              <Stack direction='row' justifyContent='space-between' p={1} spacing={0.5}>
                <Link to='/login'>
                  <Button sx={{ color: '#fff' }}>Đăng nhập</Button>
                </Link>
                <Divider orientation="vertical" flexItem sx={{ borderColor: '#ccc' }} />
                <Link to='/register'>
                  <Button sx={{ color: '#fff' }}>Đăng ký</Button>
                </Link>
              </Stack>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBarShadow>
  )
}

export default Header