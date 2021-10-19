/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import tw from 'twin.macro';
import 'twin.macro';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Loader } from './loader';
import * as actions from '../actions'
import config from './config';
import './commons.scss'
import CopCat from './img/copcat.png'
import { Notification } from './Notification';

const { apiGateway } = config;

export const LogIn = () => {
    const dispatch = useDispatch();
    const search = useLocation().search;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const loginData = useSelector((state: any) => state.login);
    const nextQuery = new URLSearchParams(search).get('next');
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

    const [initSelectAccount] = useState<any>(() => {
        if (nextQuery) {
          const domain = new URL(nextQuery);
    
          let hostnameArr = domain.hostname.replace('www.', '').split('.');
          if (hostnameArr.length > 2) {
            return hostnameArr[0];
          }
        }
        return null;
      });

    const handleChange = (property: any) => (e: any) => {
        const value = e.target.value;
        if (property === 'email') {
          setLoginForm((preValue: any) => ({
            ...preValue,
            [property]: value.toLowerCase(),
          }));
          return;
        }
        setLoginForm((preValue: any) => ({ ...preValue, [property]: value }));
      };

      const handleClose = (property: any) => {
        setError((preValue: any) => ({ ...preValue, [property]: false }));
      };
    
      const hasLoginFormError = () => {
        const { email, password } = { ...loginForm };
    
        const isBlankEmail = isEmptyOrSpaces(email?.trim());
        const isBlankPassword = isEmptyOrSpaces(password?.trim());
        const isInvalidEmail = invalidEmail(email?.trim());
    
        setError((preValue: any) => ({
          ...preValue,
          passwordError: isBlankPassword,
          emailError: isBlankEmail || isInvalidEmail,
          emailMessage: getEmailErrorMessage(email),
        }));
    
        return isBlankPassword || isBlankEmail || isInvalidEmail;
      };

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
          {(isLoading || loginData.loading) && (
            <div className='loader__component'>
              <Loader />
            </div>
          )}
          <form className='signinForm' onSubmit={onFinish}>
            <div tw='shadow-md width[60rem] py-8 px-24 m-auto rounded-lg border[2px dotted] flex flex-col justify-center items-center'>
              <div>
                <img className="icon" src={CopCat} />
                CopCat
              </div>
              <div tw='mt-10 font-medium font-size[2.2rem]'>
                WELCOME BACK
              </div>
              <div tw='my-10'>Sign in to CopCat</div>
    

                <div tw='w-full flex justify-center flex-col items-center'>

                  <div tw='w-full'>
                    <label tw=' font-medium font-size[1.5rem]! relative'>
                      Email address
                      <input
                        type="text"
                        name="username"
                        className={error.emailError ? 'error' : ''}
                        value={loginForm.email}
                        onChange={handleChange('email')}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            if (loginForm.email === '') {
                              setError({
                                ...error,
                                emailMessage: 'Email Address is a mandatory field.',
                                emailError: true,
                              });
                              return;
                            }
    
                            const isInvalidEmail = invalidEmail(
                              loginForm.email?.trim(),
                            );
                            if (isInvalidEmail) {
                              setError({
                                ...error,
                                emailMessage:
                                  'This email address is considered invalid.',
                                emailError: true,
                              });
                              return;
                            }
    
                            if (!initSelectAccount) {
                              setIsLoading(true);
                            }
                          }
                        }}
                        onBlur={() => {
                          if (loginForm.email === '') {
                            setError({
                              ...error,
                              emailMessage: 'Email Address is a mandatory field.',
                              emailError: true,
                            });
                            return;
                          }
    
                          const isInvalidEmail = invalidEmail(
                            loginForm.email?.trim(),
                          );
                          if (isInvalidEmail) {
                            setError({
                              ...error,
                              emailMessage:
                                'This email address is considered invalid.',
                              emailError: true,
                            });
                            return;
                          }
    
                          if (!initSelectAccount) {
                            setIsLoading(true);
                          }
                        }}
                        placeholder='John@example.com'
                        onInput={() => setError({ ...error, emailError: false })}
                      />
                      <Notification
                        name={'emailError'}
                        close={handleClose}
                        type={error.emailError ? 'error' : null}
                        message={error.emailMessage}
                      />
                      {/* <img
                        src={MailImg}
                        alt='Username'
                        tw='absolute width[3.4rem] top[4rem] right-2.5'
                      /> */}
                    </label>
                  </div>
                  {(initSelectAccount) && (
                    <div tw='w-full'>
                      <label
                        className='password'
                        tw=' font-medium font-size[1.5rem]! relative'
                      >
                        Password
                        <input
                          type="password"
                          value={loginForm.password}
                          className={`${error.passwordError ? 'error' : ''}`}
                          onChange={handleChange('password')}
                          placeholder="**********"
                          onInput={() =>
                            setError({ ...error, passwordError: false })
                          }
                          autoFocus
                        />
                        <Notification
                          name={'passwordError'}
                          close={handleClose}
                          type={error.passwordError ? 'error' : null}
                          message={'Password is a mandatory field'}
                        />
                        {/* <img
                          src={PassImg}
                          alt='Password'
                          tw='absolute top[3.5rem] height[2.6rem] right-4'
                        /> */}
                      </label>
                    </div>
                  )}

                </div>

                <div tw='w-full mt-8'>
                  <button tw='flex justify-center items-center font-size[1.8rem]!'>
                    <div tw='relative flex items-center'>
                      {/* <img
                        src={LockImg}
                        alt='Lock icon'
                        tw='height[2.2rem] mr-10 absolute right-full'
                      /> */}
                      SIGN IN
                    </div>
                  </button>
                </div>

              <div tw='font-size[1.5rem] text-center'>
                <div>
                  New to CopCat?{' '}
                  <Link css={[textLink]} to="/signup">
                    Create an account
                  </Link>
                </div>
    
              </div>
            </div>
          </form>
    

        </div>
      );
}

export const invalidEmail = (value:any) => {
    value = value?.trim();
    if (!value) return true;
  
    if (
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
        value,
      )
    ) {
      return false;
    }
    return true;
  };

export function isEmptyOrSpaces(str:any) {
return str == null || str.match(/^ *$/) !== null;
}

export const getEmailErrorMessage = (email:any) => {
    if (isEmptyOrSpaces(email)) {
      return 'Email Address is a mandatory field';
    }
    return invalidEmail(email) ? 'This email address is considered invalid.' : '';
  };

export const textLink = css`
${tw`hover:(underline opacity-95 text-shadow[0 0 1px lightgrey]) color[inherit]! cursor-pointer font-bold`}
`;