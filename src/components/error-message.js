import React from 'react'
import styled from '@emotion/styled'
function ErrorMessage({ error, className }) {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, index) => (
      <div key={index} className={className}>
        <p>
          <strong>Ошибка!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ))
  }
  return (
    <div className={className}>
      <p>
        <strong>Ошибка!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  )
}
ErrorMessage.defaultProps = {
  error: {},
}
const StyledErrorMessage = styled(ErrorMessage)`
  padding: 10px;
  background: #fff;
  margin: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-left: 5px solid ${props => props.theme.red};
  p {
    margin: 0;
    font-weight: 100;
    font-size: 14px;
  }
  strong {
    margin-right: 10px;
  }
`
export default StyledErrorMessage
