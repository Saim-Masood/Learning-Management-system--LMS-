import React from 'react';
import AuthForm from '../components/Auth'
import { Grid} from '@mui/material';


const Login = () => {
    return (
      <Grid container component="main" style={{ height: '100vh'  }}>
        {/* <Grid item xs = {false} md={6}>
          <ImageBox />
        </Grid> */}
        <Grid item xs={12}  >
          <AuthForm isLogin={true} />
        </Grid>
      </Grid>
    );
  };
  
  export default Login;
  