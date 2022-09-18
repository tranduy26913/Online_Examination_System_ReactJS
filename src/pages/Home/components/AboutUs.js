import React from 'react';
import { Grid, Typography, Button, Stack } from '@mui/material';
import bestTeams from 'assets/img/avatar.jpg';
import image from 'assets/img/online-study.png'
const AboutUs = () => {

  return (
    <Stack m='30px 0px 50px 0px' minHeight='500px' alignItems='center' justifyContent='center'>
      <Grid container spacing={6} p='50px' alignItems='center'>
        <Grid item xs={12} md={5}>
          <img src={image} alt="My Team" width='100%' />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight={700} mb='15px'>
            Thuận tiện - Nhanh chóng - Hiệu quả - Bảo mật
          </Typography>
          <Typography mb='12px'>
          Khi tham gia thi, người dự thi sẽ được làm bài trong thời gian quy định của bài thi. Đồng thời, trong suốt quá trình thi, mọi hoạt động của thí sinh trên hệ thống đều được ghi nhận lại.
          </Typography>
          <Typography mb='30px'>
Để đảm bảo tính an toàn, bảo mật và khách quan, hệ thống sẽ ngăn chặn cách hành vi Chuyển tab, Thoát toàn màn hình hoặc Không phát hiện khuôn mặt trước camera. Thí sinh nếu vi phạm vượt quá số lần quy định thì bài thi sẽ được hệ thống đóng lại.
          </Typography>
          {/* <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            CONTACT US
          </Button> */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AboutUs;