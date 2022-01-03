import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import User from './user'
import Signout from './signout'
const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
  a,
  button {
    margin-left: 30px;
    padding: 10px 0;
    position: relative;
    font-size: 1.4rem;
    color: ${props => props.theme.black};
    font-weight: 400;
    &::after {
      content: '';
      width: 0;
      height: 2px;
      position: absolute;
      background: ${props => props.theme.softViolet};
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 20px;
    }
    &:hover::after {
      width: 100%;
    }
  }
  .write,
  .signup {
    background-color: ${props => props.theme.softViolet};
    color: ${props => props.theme.white};
    border-radius: 4px;
    display: block;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: #5c32d5;
    }
    &:after {
      display: none;
    }
    &:hover::after {
      display: none;
    }
  }
`
export const MobileMenu = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .content {
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1500;
      opacity: 0;
      width: 0;
      transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    .content > ul {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      width: 100%;
      a,
      button {
        text-transform: uppercase;
        display: inline-flex;
        line-height: 22px;
        font-size: 15px;
        color: ${props => props.theme.black};
        text-decoration: none;
        position: relative;
        left: 0;
        margin-bottom: 32px;
        font-weight: bold;
      }
      .write,
      .signup {
        color: ${props => props.theme.softViolet};
      }
    }
    .checkbox {
      display: none;
    }
    .button {
      background-color: ${props => props.theme.white};
      height: 30px;
      width: 30px;
      position: fixed;
      border-radius: 50%;
      z-index: 2000;
      text-align: center;
      cursor: pointer;
    }
    .background {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      position: fixed;
      background-color: ${props => props.theme.white};
      z-index: 1000;
      transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
      will-change: transform;
    }
    .checkbox:checked {
      ~ .background {
        transform: scale(80);
      }
      ~ .content {
        opacity: 1;
        width: 100%;
      }
      + .button .icon {
        background-color: transparent;
        &::before {
          top: 0;
          transform: rotate(135deg);
        }
        &::after {
          top: 0;
          transform: rotate(-135deg);
        }
      }
    }
    .icon {
      position: relative;
      margin-top: 14px;
    }
    .icon,
    .icon::before,
    .icon::after {
      width: 25px;
      height: 2px;
      background-color: #333;
      display: inline-block;
    }
    .icon::before,
    .icon::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0.2s;
    }
    .icon::before {
      top: -8px;
    }
    .icon::after {
      top: 8px;
    }
    .button:hover .icon::before {
      top: -10px;
    }
    .button:hover .icon::after {
      top: 10px;
    }
  }
`
function Nav() {
  return (
    <User>
      {({ data: { me } }) => (
        <Fragment>
          <MobileMenu>
            <input className="checkbox" type="checkbox" id="toggle" />
            {}
            <label className="button" htmlFor="toggle">
              <span className="icon">&nbsp;</span>
            </label>
            <div className="background">&nbsp;</div>
            <nav className="content">
              <ul>
                {me && (
                  <Fragment>
                    <li>
                      <Link href="/create-story">
                        <a className="write">Написать рассказ</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/me">
                        <a>Профиль</a>
                      </Link>
                    </li>
                    <li>
                      <Signout />
                    </li>
                  </Fragment>
                )}
                {!me && (
                  <Fragment>
                    <li>
                      <Link href="/signup">
                        <a className="signup">Регистрация</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/signin">
                        <a>Вход</a>
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </MobileMenu>
          <StyledNav>
            {me && (
              <Fragment>
                <Link href="/create-story">
                  <a className="write">Написать рассказ</a>
                </Link>
                <Link href="/me">
                  <a>Профиль</a>
                </Link>
                <Signout />
              </Fragment>
            )}
            {!me && (
              <Fragment>
                <Link href="/signup">
                  <a className="signup">Регистрация</a>
                </Link>
                <Link href="/signin">
                  <a>Вход</a>
                </Link>
              </Fragment>
            )}
          </StyledNav>
        </Fragment>
      )}
    </User>
  )
}
export default Nav
