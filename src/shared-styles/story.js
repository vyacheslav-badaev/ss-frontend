import { css } from '@emotion/core'
import { fadeIn } from './animations'
export const storyStyles = props => css`
  max-width: 700px;
  margin: 0 auto;
  padding: 104px 24px 0 24px;
  .title,
  .body {
    font-family: ${props.theme.textFont};
    color: ${props.theme.black};
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title {
    font-size: 3.2rem;
    font-weight: 700;
    margin: 24px 0;
    opacity: 0;
    animation: ${fadeIn} 1s ease 0.2s 1 normal forwards running;
  }
  .body {
    font-size: 1.8rem;
    line-height: 2.8rem;
    opacity: 0;
    animation: ${fadeIn} 1s ease 0.7s 1 normal forwards running;
  }
  &.dark {
    .title,
    .body {
      color: ${props.theme.nightGrey};
    }
  }
`
export const formStoryStyles = props => css`
  .title,
  .body {
    opacity: 1;
    animation: initial;
  }
  input,
  textarea {
    width: 100%;
    font-family: ${props.theme.textFont};
    border: none;
    color: ${props.theme.black};
  }
  textarea {
    min-height: 500px;
  }
  .genres {
    margin-bottom: 24px;
  }
  .error-message {
    display: block;
    font-size: 1.2rem;
    font-weight: 400;
    font-family: ${props.theme.uiFont};
    color: ${props.theme.red};
    margin-top: 4px;
  }
  button[type='submit'] {
    width: 100%;
    margin: 24px 0;
  }
  &.dark {
    input,
    textarea,
    button {
      color: ${props.theme.nightGrey};
    }
    button[type='submit'] {
      color: ${props.theme.black};
      background-color: ${props.theme.nightGrey};
    }
  }
`
