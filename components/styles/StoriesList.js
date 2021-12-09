import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 0.95;
    transform: translateZ(0);
  }
`
const StoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
  > article {
    animation-name: ${fadeInUp};
    animation-duration: 1s;
    animation-fill-mode: backwards;
    animation-timing-function: ease;
    will-change: transform, opacity;
  }
  @media (min-width: 980px) {
    > article:nth-child(3n + 1) {
      animation-delay: 0.2s;
    }
    > article:nth-child(3n + 2) {
      animation-delay: 0.4s;
    }
    > article:nth-child(3n + 3) {
      animation-delay: 0.6s;
    }
  }
  @media (min-width: 660px) and (max-width: 979px) {
    > article:nth-child(2n + 1) {
      animation-delay: 0.2s;
    }
    > article:nth-child(2n + 2) {
      animation-delay: 0.4s;
    }
  }
  @media (max-width: 659px) {
    > article:nth-child(1n + 1) {
      animation-delay: 0.2s;
    }
  }
`
export default StoriesList
