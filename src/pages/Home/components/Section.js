import React from 'react';
import { Grid, Typography, Stack, Paper } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import img1 from 'assets/img/img1.jpg'
import img2 from 'assets/img/img1.jpg'
import img3 from 'assets/img/img1.jpg'
import img4 from 'assets/img/img1.jpg'
import img5 from 'assets/img/img1.jpg'

const Section = () => {

  const sectionItems = [
    {
      id: 1,
      icon: <EngineeringOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Đội ngũ phát triển làm việc tích cực. Mang đến người dùng sản phẩm tốt nhất',
    },
    {
      id: 2,
      icon: <AllInclusiveIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence:
        'Chức năng được cải tiến liên tục, phục vụ chính xác nhu cầu khách hàng',
    },
    {
      id: 3,
      icon: <PaidOutlinedIcon sx={{ fontSize: 100 }} color="primary" />,
      sentence: 'Hình thức thanh toán đa dạng, dễ dàng và bảo mật',
    },
  ];
  return (
    <Stack alignItems='center' mt={2} spacing={2} className='home-item'>
      <Typography align='center' color='primary' fontSize='24px'>Khám phá tính năng nổi bật của Bello Quiz</Typography>
      {/* <Grid container width='100%' justifyContent='space-around'>
        {sectionItems.map((item) => (
          <Grid
            item
            xs={12}
            md={3.5}
            key={item.id}

          >
            <Paper className='showtotop' elevation={24} sx={{ width: '100%', height: '100%' }}>

              <Stack alignItems='center' spacing={2} p={2} >
                {item.icon}
                <Typography align='center'>{item.sentence}</Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid> */}
      <Paper sx={{margin:'0 16px'}}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} p={3} sx={{fontSize:'18px'}}>
          <Stack flex={1} sx={{fontSize:'18px'}} justifyContent='center'>
              Tham gia vào hệ thống, bạn có thể tạo và tổ chức các khoá học trực tuyến với nội dung sáng tạo không giới hạn.
             <br/>
             <br/>
              Bạn có thể tổ chức các bài thi, bài tập, quản lý học viên và kết quả học tập một các dễ dàng, nhanh chóng và thuận tiện.
             
          </Stack>
          <Stack flex={1}>
            <img src={img1} width='100%' />
          </Stack>
        </Stack>
    
</Paper >
      </Stack>
  );
};

export default Section;