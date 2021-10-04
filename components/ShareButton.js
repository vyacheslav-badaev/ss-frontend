import React from 'react'
import styled from '@emotion/styled'
import { string } from 'prop-types'
const StyledLink = styled.a`
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
function ShareButton({ href, title, icon, className = '' }) {
  return (
    <StyledLink
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
    </StyledLink>
  )
}
ShareButton.propTypes = {
  className: string,
  href: string.isRequired,
  title: string.isRequired,
  icon: string.isRequired,
}
export default ShareButton
