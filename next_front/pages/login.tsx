import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';

import Axios from 'axios'
import * as https from "https";
import {Alert} from "@mui/lab";
import {useState} from "react";
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
  withCredentials: true,
  // httpsAgent: new https.Agent({
  //   rejectUnauthorized: false
  // })
})

const Login = () => {

  const [loginError, setLoginError] = useState(false)
  const [loginSuccess, setloginSuccess] = useState(false)

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: () => {
      router.push('/');
    }
  });

  async function loginSubmit(){

    setLoginError(false)

    await axios.get('/sanctum/csrf-cookie').then(  async(response:any)=>{

      const loginResult = await axios.post('/api/login',{
        email: formik.values.email,
        password: formik.values.password,
      })

      //ログイン失敗
      if (loginResult.data.result !== 'ok') {
        setLoginError(true)
        return
      }


      setloginSuccess(true)

      setTimeout(()=>window.location = '/settings',1000)

    })



  }


  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Dashboard
            </Button>
          </NextLink>

          {/*ログイン失敗メッセージ*/}
          {loginError&&<Alert severity="error">ログインに失敗しました</Alert>}

          {/*ログイン成功メッセージ*/}
          {loginSuccess&&<Alert severity="success">ログインに成功しました、認証ページに遷移します</Alert>}

          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                サインイン
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            {/*<Grid*/}
            {/*  container*/}
            {/*  spacing={3}*/}
            {/*>*/}
            {/*  <Grid*/}
            {/*    item*/}
            {/*    xs={12}*/}
            {/*    md={6}*/}
            {/*  >*/}
            {/*    <Button*/}
            {/*      color="info"*/}
            {/*      fullWidth*/}
            {/*      startIcon={<FacebookIcon />}*/}
            {/*      onClick={formik.handleSubmit}*/}
            {/*      size="large"*/}
            {/*      variant="contained"*/}
            {/*    >*/}
            {/*      Login with Facebook*/}
            {/*    </Button>*/}
            {/*  </Grid>*/}
            {/*  <Grid*/}
            {/*    item*/}
            {/*    xs={12}*/}
            {/*    md={6}*/}
            {/*  >*/}
            {/*    <Button*/}
            {/*      fullWidth*/}
            {/*      color="error"*/}
            {/*      startIcon={<GoogleIcon />}*/}
            {/*      onClick={formik.handleSubmit}*/}
            {/*      size="large"*/}
            {/*      variant="contained"*/}
            {/*    >*/}
            {/*      Login with Google*/}
            {/*    </Button>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            {/*<Box*/}
            {/*  sx={{*/}
            {/*    pb: 1,*/}
            {/*    pt: 3*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <Typography*/}
            {/*    align="center"*/}
            {/*    color="textSecondary"*/}
            {/*    variant="body1"*/}
            {/*  >*/}
            {/*    or login with email address*/}
            {/*  </Typography>*/}
            {/*</Box>*/}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="メールアドレス"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="パスワード"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="button"
                variant="contained"
                onClick={loginSubmit}
              >
                サインイン
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
