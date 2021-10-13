import { useState, useEffect } from "react";
import Router from 'next/router';
import GoogleLogin from "react-google-login";

import { loginWithGoogle, isAuth, storeAuthInfo } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";

const LoginGoogle = () => {

    const responseGoogle = res => {
        const tokenId = res.tokenId;
        loginWithGoogle(tokenId).then(res => {
            console.log(res);
            if (res.status === 200) {
                storeAuthInfo(res.data, () => {
                    if (isAuth() && isAuth().role === 1) {
                        Router.push('/admin');
                    } else {
                        Router.push('/user');
                    }
                });
            }
        }).catch(err => console.log(err));
    }

    return (
        <div className='pb-3'>
            <GoogleLogin 
                clientId={GOOGLE_CLIENT_ID}
                buttonText='Login with Google'
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                theme='dark'
            />
        </div>
    );
}

export default LoginGoogle;