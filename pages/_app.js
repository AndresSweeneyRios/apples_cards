import "../sass/global.sass";
import Head from 'next/head';

export default ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>next_fullstack_template</title>
                <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" />
                <meta name="theme-color" content="#272727"></meta> 
            </Head>
            <Component {...pageProps} />
        </>
    )
}