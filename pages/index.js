import React from 'react'
import Link from 'next/link'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import Wrapper from '../components/Wrapper'
import Stories from '../components/Stories'
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const SEOBlock = styled.div`
  margin-top: 60px;
  background-color: ${props => props.theme.white};
  text-align: left;
  position: relative;
  flex-basis: 100%;
  width: 100%;
  padding: 5vh 0;
  z-index: 2;
  order: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-top: 2px solid ${props => props.theme.lightGrey};
  letter-spacing: 0.6px;
  .inner {
    width: 100%;
    max-width: 1024px;
    padding: 0 24px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .text {
    flex: 2;
    h1 {
      opacity: 0;
      animation: ${fadeIn} 1s ease 0.2s 1 normal forwards running;
    }
    p {
      opacity: 0;
      margin-top: 20px;
      font-size: 2rem;
      line-height: 1.3;
      animation: ${fadeIn} 1s ease 0.7s 1 normal forwards running;
    }
  }
  .write {
    display: block;
    opacity: 0;
    font-size: 10rem;
    animation: ${fadeIn} 1s ease 0.8s 1 normal forwards running;
    flex: 1;
    text-align: center;
    @media (max-width: 750px) {
      display: none;
    }
  }
`
function Home() {
  return (
    <>
      <SEOBlock>
        <div className="inner">
          <div className="text">
            <h1>Здесь вы можете читать рассказы авторов из народа.</h1>
            <p>
              Откройте для себя новых авторов или{' '}
              <Link href="/create-story">
                <a>продемонстрируйте</a>
              </Link>{' '}
              писательский талант и станьте лучшим.
            </p>
          </div>
          <span className="write" role="img" aria-label="emoji">
            ✍️
          </span>
        </div>
      </SEOBlock>
      <Wrapper isIndex>
        <Stories />
      </Wrapper>
    </>
  )
}
export default Home
