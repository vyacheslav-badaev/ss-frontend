import { keyframes } from '@emotion/core'
export const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(109, 71, 217, 0.4);
  }
  70% {
    box-shadow: 0 0 0 7px rgba(204, 169, 44, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(204, 169, 44, 0);
  }
`
export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const reverseSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 0.95;
    transform: translateZ(0);
  }
`
export const toWritten = keyframes`
  from {
    left: 85px;
  }
  to {
    left: 0px;
  }
`
export const toLiked = keyframes`
  from {
    left: 0px;
  }
  to {
    left: 85px;
  }
`
