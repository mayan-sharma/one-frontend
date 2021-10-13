import Document, { Html, Head, Main, NextScript } from 'next/document';

import { PROD, GOOGLE_ANALYTICS_ID } from '../config';

class MyDocument extends Document {
    setGoogleTags() {
        if (PROD) {
            return {
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ANALYTICS_ID}');
                `
            }
        }
    }
    
    render() {
        console.log(PROD);
        return (
            <Html lang='en'>
                <Head>
                    <meta charSet='UTF-8' />
                    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css' />
                    <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}></script>
                    <script dangerouslySetInnerHTML={this.setGoogleTags()}></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>                
            </Html>
        );
    }
}

export default MyDocument;