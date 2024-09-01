import React from 'react';
import { Grid } from '@mui/material';
import AuthForm from '../components/Auth';

// import { styled } from '@mui/system';

// const ImageBox = styled(Box)(({ theme }) => ({
//   height: '100vh',
//   backgroundSize: 'auto 20px',
//   backgroundPosition: 'center',
//   [theme.breakpoints.down('md')]: {
//     display: 'none',
//   },
// }));

const Signup = () => {
  return (
    <Grid container component="main" style={{ height: '100vh' }}>
      {/* <Grid item  xs={false} md={6}>
        <ImageBox />
      </Grid> */}
      <Grid item xs={12} >
        <AuthForm isLogin={false} />
      </Grid>
    </Grid>
  );
};

export default Signup;
