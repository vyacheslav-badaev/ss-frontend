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
