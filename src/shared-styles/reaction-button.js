import styled from '@emotion/styled'
import { pulse } from './animations'
const ReactionButton = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  width: 60px;
  button {
    background-color: ${props => props.theme.white};
    border: 1px solid ${props => props.theme.black};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    padding: 8px;
    cursor: pointer;
    outline: none;
    box-shadow: 0 0 0 rgba(109, 71, 217, 0.4);
    animation: ${pulse} 2s infinite;
    transform: scale(1);
    transition: transform 0.25s ease-in-out;
    &:hover {
      animation: none;
      transform: scale(1.06);
    }
    &:active {
      transform: scale(0.88);
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  span {
    color: ${({ theme, dark }) => (dark ? theme.nightGrey : theme.black)};
    margin-left: 10px;
    font-weight: bold;
  }
`
export default ReactionButton
