// import { css } from '@emotion/react';
import tw from 'twin.macro';
import 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Loader } from './loader';
import * as actions from '../actions'
import config from './config';
import './commons.scss'

const { apiGateway } = config;

export const LogIn = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loginData = useSelector((state: any) => state.login);
    const [loginForm, setLoginForm] = useState<{
        email: string;
        password: string;
      }>({ email: '', password: '' });
    
    const [error, setError] = useState<{
    emailError: boolean;
    passwordError: boolean;
    apiError: boolean;
    apiErrorMessage: string;
    emailMessage: string;
    }>({
    emailError: false,
    passwordError: false,
    apiError: false,
    apiErrorMessage: '',
    emailMessage: '',
    });

    useEffect(() => {

    if (loginData.errorMessage) {
        setError((preValue: any) => ({
        ...preValue,
        apiError: true,
        apiErrorMessage: loginData.errorMessage,
        }));
    }

    const close = (e: any) => {
        if (e.keyCode === 27) {
        // handleModalClose();
        }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
    }, [loginData.errorMessage]);

    const onFinish = (e: any) => {
        e.preventDefault();
        console.log(e);
    
        // if (hasLoginFormError()) {
        //   return;
        // }
    
        dispatch(
          actions.initLogin({
            email: loginForm.email.trim(),
            password: loginForm.password
          }),
        );
      };

    return (
        <div tw='height[calc(100vh - 7rem)] overflow-y-auto'>
            {(isLoading || loginData.login) && (
                <div className='loader__component'>
                    <Loader />
                </div>
            )}
            <form className='signinForm' onSubmit={onFinish}>
                <div>
                    <div tw='mt-10 font-medium font-size[2.2rem]'>
                        WELCOME
                    </div>
                </div>
            </form>

        </div>
    )
}