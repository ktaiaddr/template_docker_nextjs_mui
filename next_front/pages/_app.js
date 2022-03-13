import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { theme } from '../theme';
import {useEffect, useState} from "react";
import Axios from "axios";
import {Skeleton} from "@mui/lab";

const clientSideEmotionCache = createEmotionCache();

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_HOST,
    withCredentials: true,
    // httpsAgent: new https.Agent({
    //   rejectUnauthorized: false
    // })
})

const App = (props) => {

    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    const [loginChecked,setLoginChecked] = useState(false);

    useEffect(() => {

        // ログインページなら処理なし
        if(props.router.pathname ==='/login') return

        /**
         * ログインページ以外の共通ログイン状態確認を行う
         */
        (async ()=>{

            try{
                const loginCheckResult = await axios.get('/api/check')

                //ログイン済みとしてステートを更新
                if (loginCheckResult.data.result === 'logined') {
                    setLoginChecked(true)
                }
                else{
                    window.location = '/login'
                }
            }
            catch(e){
                //ログインしていないときは、ログインページへ遷移
                window.location = '/login'
            }

        })()

    },[props.router.pathname])

    const getLayout = Component.getLayout ?? ((page) => page);

    if (props.router.pathname!=='/login' && !loginChecked) return <></>

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>
                    Material Kit Pro:wq
                </title>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </LocalizationProvider>
        </CacheProvider>
    );
};

export default App;
