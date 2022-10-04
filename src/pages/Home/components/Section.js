import React from 'react';
import { Grid, Typography, Stack, Paper } from '@mui/material';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';


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
    <Stack direction='row' justifyContent='center' mt={2}  className='home-item'>
      <Grid container width='100%' justifyContent='space-around'>
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
      </Grid>
    </Stack>
  );
};

export default Section;