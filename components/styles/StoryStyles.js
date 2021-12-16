import styled from '@emotion/styled'
const StoryStyles = styled.article`
  cursor: pointer;
  opacity: 0.95;
  height: 450px;
  overflow: hidden;
  background: ${props => props.theme.white};
  padding: 25px;
  border-radius: 8px;
  transform: translateZ(0);
  transition: transform 0.3s ease, opacity 0.2s ease;
  transition-delay: 0.1s;
  &:hover {
    opacity: 1;
    transform: translate(0, -4px);
  }
  .title {
    margin: 10px 0;
    font-size: 2.4rem;
    font-weight: bold;
    font-family: ${props => props.theme.textFont};
    line-height: 1.2;
  }
  .labels {
    margin-bottom: 10px;
    .genre,
    .length {
      color: ${props => props.theme.white};
      border-radius: 8px;
      padding: 6px 8px;
      display: inline-block;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .length {
      margin-left: 10px;
    }
    .genre {
      background-color: ${props => props.theme.softViolet};
    }
    .short {
      background-color: #0ab7a6;
    }
    .long {
      background-color: #ba154d;
    }
    .middle {
      background-color: #c6a5d8;
    }
  }
  .body {
    font-size: 1.6rem;
    font-family: ${props => props.theme.textFont};
    line-height: 1.35;
  }
  .edit-and-delete {
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-top: -20px;
    margin-right: -20px;
    margin-left: -20px;
    button {
      background-color: ${props => props.theme.white};
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.25s ease-in-out;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${props => props.theme.lightGrey};
      }
    }
  }
`
export default StoryStyles
