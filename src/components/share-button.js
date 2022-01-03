import React from 'react'
import styled from '@emotion/styled'
function ShareButton({ href, title, icon, className = '' }) {
  return (
    <a
      className={className}
      href={href}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div>
        <div aria-hidden="true">
          <img src={icon} alt={title} />
        </div>
      </div>
    </a>
  )
}
const StyledShareButton = styled(ShareButton)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${props => props.theme.black};
  transition: all 0.25s ease-out;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 16px;
    height: 16px;
  }
  &:hover {
    background-color: ${props => props.theme.softViolet};
  }
`
export default StyledShareButton
