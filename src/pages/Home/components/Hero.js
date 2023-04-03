import { Player } from '@lottiefiles/react-lottie-player';
import { Grid, Typography, Button, Stack, Box } from '@mui/material';

const Hero = () => {

  return (
    <Stack width='100%' mb={3} justifyContent='center' alignItems='center'>
      <Grid container spacing={6} p='50px' alignItems='center'>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} pb='15px'>
            Nền tảng tạo đề thi và bài tập trực tuyến
          </Typography>
          <Typography variant="h6" pb='30px'>
            Tạo đề thi trắc nghiệm nhanh chóng với nhiều dạng câu hỏi,giao bài tập dễ dàng. 
            Giám sát thí sinh hiệu quả, thống kê trực quan.
          </Typography>
          <Typography variant="h6" pb='30px'>
           
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
          <Box style={{ borderRadius: '12px' }}  >
            <Player
              autoplay
              loop
              src="https://assets9.lottiefiles.com/packages/lf20_aljpo8bg.json"
              style={{ width: '100%' }}
            >
            </Player>
          </Box>
          {/* <img src={myteam2} alt="My Team" width='100%' style={{ borderRadius: '12px' }} /> */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Hero;