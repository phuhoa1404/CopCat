/** @jsxImportSource @emotion/react */
import tw from 'twin.macro';
import { css } from '@emotion/react';
import 'twin.macro';
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';
import { IdleTime }  from '../components/IdleTime'
import CopCat from './img/copcat.png'
import { Hint } from './Hint';
import './Navbar.scss'

export const NavBar = (props: any) => {
    const { token, history, location } = props;
    const historyNavigate = useHistory();
    let currentPath = historyNavigate.location.pathname.toLowerCase();
    const topleftNav = () => {
        return (
            <>
            <IdleTime />
            </>
        );
    };
    const handleClickIcon = (e: any) => {
        e.preventDefault();
        window.location.replace('http://localhost:3000/home')
        // history.push('/home');
      };
      return (
        <>
          <div
            className={`top-bar white`}
            id="responsive-menu"
            css={[tw`z-index[1]`]}
            tw="flex-nowrap"
          >
            <div className="" tw="flex-1 h-full">
              <div
                className="top-bar-left"
                tw="flex justify-between h-full! box-border!"
              >
                <ul className="menu margin-left-2" tw="flex-nowrap flex-1">
                    <li className="icon">
                    <Hint text="CopCat home page">
                        <Link to="home" onClick={handleClickIcon}>
                            <img className="icon" src={CopCat} />
                        </Link>
                    </Hint>
                    </li>
                    <>
                    <li css={[navbarTabCss]}>
                        <Hint text="Content library view">
                        <NavLink
                            to="/home"
                            activeClassName="underline"
                            className="active"
                        >
                            CopCat
                        </NavLink>
                        </Hint>
                    </li>
                    </>
                </ul>
              </div>
            </div>
            <div className="">
              <ul tw="flex-nowrap items-start!" className="menu SignInSignUp">
                {topleftNav()}
              </ul>
            </div>
          </div>

    
          {/* {global.showThumbnailModal && <ThumbnailModal ref={thumbnailModalRef} />} */}
    
          {/* {isLibraryPage() && !isDisplayClips() && (
            <div tw="fixed bottom[5%] right[4%] z-index[3] shadow-2xl rounded-full">
              <Hint text="Upload video / audio files">
                <Fab tw="bg-sonnant-purple-2" onClick={() => setModalOpen(true)}>
                  <AddSvg />
                </Fab>
              </Hint>
            </div>
          )} */}
        </>
      );
}

export const navbarTabCss = css`
  ${tw`h-full mr-3!`}
  a {
    ${tw`(h-full flex items-center box-border px-3)!`}

  }
`;