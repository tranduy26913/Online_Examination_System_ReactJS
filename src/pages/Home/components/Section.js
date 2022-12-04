import React from 'react';
import { Grid, Typography, Stack, Paper, Box, styled } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import img1 from 'assets/img/img1.jpg'
import img2 from 'assets/img/img2.jpg'
import img3 from 'assets/img/img3.jpg'
import img4 from 'assets/img/img4.jpg'
import img5 from 'assets/img/img5.jpg'

const BoxContent = styled(Box)(({ theme }) => ({
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  fontSize: '18px',
  fontWeight: 500,
  marginTop:'8px',
  paddingLeft:'8px'
}))
const TitleFeature = styled(Typography)(({ theme }) => ({
  textAlign:'center',
  fontSize: '20px',
  fontWeight: 500,
  textTransform:'uppercase',
  color:theme.palette.primary.main
}))
const Section = () => {

  return (
    <Stack alignItems='center' mt={2} spacing={2}>
      <Typography align='center' color='primary' fontSize='28px'>Khám phá tính năng nổi bật của Bello Quiz</Typography>
      <Paper sx={{ margin: '0 16px' }} elevation={6}>
        <Stack spacing={4} >

          <Stack className='showtotop home-item' direction={{ xs: 'column', md: 'row' }} spacing={5} p={3} sx={{ fontSize: '18px' }}>
            <Stack flex={1} sx={{ fontSize: '18px' }} justifyContent='center'>
              <TitleFeature>QUẢN LÝ KHOÁ HỌC</TitleFeature>
              <BoxContent>
                Tham gia vào hệ thống, bạn có thể tạo và tổ chức các khoá học trực tuyến với nội dung sáng tạo không giới hạn.
              </BoxContent>
              <BoxContent>
              Bạn có thể tổ chức các bài thi, bài tập, quản lý học viên và kết quả học tập một các dễ dàng, nhanh chóng và thuận tiện.
              </BoxContent>           

            </Stack>
            <Stack flex={1}>
              <img src={img1} width='100%' alt='course 1' style={{ borderRadius: '8px' }} />
            </Stack>
          </Stack>
          <Stack className='showtotop home-item' direction={{ xs: 'column', md: 'row' }} spacing={5} p={3} sx={{ fontSize: '18px' }}>
            <Stack flex={1}>
              <img src={img2} width='100%' alt='list exam' style={{ borderRadius: '8px' }} />
            </Stack>
            <Stack flex={1} sx={{ fontSize: '18px' }} justifyContent='center'>
              Với vai trò là một giáo viên, người tổ chức khoá học, bạn có thể dễ dàng quản lý các đề thi
              <br />
              <br />
              Danh sách đề thi giúp bạn dễ dàng thực hiện các tác vụ cũng như theo dõi trạng thái, lượt tham gia làm bài thi.
            </Stack>
          </Stack>

          <Stack className='showtotop home-item' direction={{ xs: 'column', md: 'row' }} spacing={5} p={3} sx={{ fontSize: '18px' }}>

            <Stack flex={1} sx={{ fontSize: '18px' }} justifyContent='center'>
              Giáo viên có thể tạo ra các đề thi với cấu hình đa dạng:
              <br />
              <BoxContent>

                <ul style={{ padding: '0 30px' }}>
                  <li>Tuỳ chỉnh thời gian làm bài</li>
                  <li>Giám sát tự động quá trình làm bài của thí sinh</li>
                  <li>Nạp các câu hỏi bằng File</li>
                  <li>Cách tính điểm đa dạng</li>
                  <li>Bảo mật thông tin đề thi</li>
                </ul>

              </BoxContent>
            </Stack>
            <Stack flex={1}>
              <img src={img3} width='100%' alt='exam' style={{ borderRadius: '8px' }} />
            </Stack>
          </Stack>
        </Stack>

      </Paper >
    </Stack>
  );
};

export default Section;