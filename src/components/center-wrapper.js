import React from 'react'
import styled from '@emotion/styled'
function CenterWrapper({ children, className }) {
  return (
    <main className={className}>
      <div className="inner">
        <div className="columns">{children}</div>
      </div>
    </main>
  )
}
const StyledCenterWrapper = styled(CenterWrapper)`
  &::before {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #140028;
    background-image: url('/static/images/topography.svg'),
      linear-gradient(20deg, #140028, #141414);
    background-size: 170px, auto;
    background-repeat: repeat;
    z-index: -1;
  }
  .inner {
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 380px));
    justify-content: center;
  }
`
export default StyledCenterWrapper
