// src/components/Auth.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Divider, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  margin: 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  borderRadius: '10px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
}));

const AuthForm = ({ isLogin, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setFullName('');
    setPhoneNumber('');
    setEmailError('');
    setPasswordError('');
    setFullNameError('');
    setPhoneNumberError('');
  }, [isLogin]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  const validateFullName = (fullName) => /^[A-Za-z]+([A-Za-z]+\s[A-Za-z]+)*$/.test(fullName);
  const validatePhoneNumber = (phoneNumber) => /^(\+?\d{1,3}[-.\s]?|\(?\d{2,4}\)?[-.\s]?)?\d{7,10}$/.test(phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one letter and one number');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!isLogin) {
      if (!validateFullName(fullName)) {
        setFullNameError('Invalid full name format');
        valid = false;
      } else {
        setFullNameError('');
      }

      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneNumberError('Invalid phone number format');
        valid = false;
      } else {
        setPhoneNumberError('');
      }
    }

    if (!valid) return;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin && onLogin(); // Ensure onLogin is a function
        navigate('/dashboard');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/login');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Grid container alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {isLogin ? 'Log In' : 'Sign Up'}
          </Typography>
          <Divider variant="middle" sx={{ marginBottom: 2 }} />
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={!!fullNameError}
                  helperText={fullNameError}
                  required
                />
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  error={!!phoneNumberError}
                  helperText={phoneNumberError}
                  required
                />
              </>
            )}
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
            <Box textAlign="center" marginTop={2}>
              {isLogin ? (
                <Button onClick={() => navigate('/signup')}>
                  Don't have an account? Sign Up
                </Button>
              ) : (
                <Button onClick={() => navigate('/login')}>
                  Already have an account? Log In
                </Button>
              )}
            </Box>
          </form>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default AuthForm;
