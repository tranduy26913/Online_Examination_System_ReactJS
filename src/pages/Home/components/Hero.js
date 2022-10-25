import { Grid, Typography, Button, Stack } from '@mui/material';
import myteam2 from 'assets/img/home-hero.png';

const Hero = () => {

  return (
    <Stack width='100%' minHeight='600px' justifyContent='center' alignItems='center'>
      <Grid container spacing={6} p='50px' alignItems='center'>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} pb='15px'>
          Nền tảng tạo đề thi trắc nghiệm
          </Typography>
          <Typography variant="h6" pb='30px'>
          Tạo đề thi, game trắc nghiệm nhanh chóng với nhiều dạng câu hỏi.
Giám sát thí sinh hiệu quả, thống kê trực quan...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '200px', fontSize: '16px' }}
          >
            THAM GIA NGAY
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={myteam2} alt="My Team" width='100%' style={{borderRadius:'12px'}} />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Hero;