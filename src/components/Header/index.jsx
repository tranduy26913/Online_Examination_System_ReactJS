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
  Divider
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const pages = ['Trang chủ', 'Khoá học', 'Về chúng tôi'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const AppBarShadow = styled(AppBar)(({ theme }) => ({
  //boxShadow:`0 4px 10px 4px ${theme.palette.primary.main}`
  //backgroundColor:'#fff',
  boxShadow: `0 4px 10px 4px #aaa`
}))

function Header() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isDashboard, setIsDashboard] = React.useState(false);
  const [opacity, setOpacity] = React.useState(1);
  const location = useLocation()
  const user = useSelector(state => state.auth.user)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const onChangePath = () => {
      const dashboard = location.pathname.includes('student/') || location.pathname.includes('teacher/')
      //setIsDashboard(dashboard)

    }
    onChangePath()
  }, [location.pathname])
  // React.useEffect(()=>{
  //   const changeOpacity = ()=>{
  //     const scrollY = document.body.scrollTop | document.documentElement.scrollTop
  //     const target = 0.3
  //     const positionY = 100
  //     console.log(scrollY)
  //     if(scrollY < positionY - 1){
  //       setOpacity(1 - (1 - target)/(positionY - scrollY))
  //     }
  //     else
  //       setOpacity(1 - target)
  //   }
  //   window.addEventListener('scroll',changeOpacity)
  //   return ()=>{
  //     window.removeEventListener('scroll',changeOpacity)
  //   }
  // },[])
  return (

    <AppBarShadow position="sticky" sx={{ opacity }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters
          sx={{
            height: '56px',
            minHeight: '56px !important',
            justifyContent: isDashboard ? 'flex-end' : 'unset',
          }}>
          {isDashboard === false &&
            <>
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
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            </>}

          <Box sx={{ flexGrow: 0 }}>
            {user ?
              <>
                <Tooltip title="Open settings">
                  <Stack direction='row' alignItems='center' mr={2} spacing={1}>

                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
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