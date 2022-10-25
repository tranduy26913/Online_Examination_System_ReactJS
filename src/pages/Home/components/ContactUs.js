import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Button,
    Stack
} from '@mui/material';

const inputStyle = {
  marginBottom: '20px !important',

}
const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject });
  };

  return (
    <Stack alignItems='center' className='home-item'>
      <Paper elevation={24} className='showtotop'>
        <Stack p={2} maxWidth='650px' >
          <Typography variant="h4" align='center' color='primary'>
            Contact Us
          </Typography>
          <Box
            mt='30px'
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              sx={inputStyle}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              sx={inputStyle}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />

            <Stack direction='row' justifyContent='center'>

              <Button
                variant="contained"
                type="submit"
                color="primary"
                sx={{ width: '200px', fontSize: '16px' }}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ContactUs;