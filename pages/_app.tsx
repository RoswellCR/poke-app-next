import type { AppProps } from "next/app";

import { NextUIProvider } from '@nextui-org/react';
import darkTheme from '../themes/darktheme';

import '../styles/global.css';
import { Layout } from "../components/layouts/layout";

function MyApp({Component, pageProps}: AppProps){
    return (
    <NextUIProvider theme = {darkTheme}>
        <Component {...pageProps}/>
    </NextUIProvider> )
}

export default MyApp