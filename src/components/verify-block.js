import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { Mutation } from 'react-apollo'
import { ErrorMessage, Loader, Logo } from '.'
import { VERIFY_MUTATION } from '../lib/mutations'
const Block = styled.div`
  min-height: 204px;
  background-color: ${props => props.theme.white};
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.45) 0px 2px 10px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    margin-top: 20px;
  }
  h3 {
    font-size: 1.6rem;
    line-height: 1;
    margin-bottom: 0;
  }
`
function Success({ verify, loading, data, error }) {
  useEffect(() => {
    verify()
  }, [verify])
  return (
    <div>
      <ErrorMessage error={error} />
      {loading && <Loader />}
      {data && (
        <h3>
          Ваш аккаунт подтвержден{' '}
          <span aria-label="fire" role="img">
            🔥
          </span>
        </h3>
      )}
    </div>
  )
}
function VerifyBlock({ token }) {
  return (
    <Block>
      <Logo />
      {!token ? (
        <h3>Ошибка! Не пытайтесь верифицировать аккаунт без токена!</h3>
      ) : (
        <Mutation mutation={VERIFY_MUTATION} variables={{ token }}>
          {(verify, result) => <Success verify={verify} {...result} />}
        </Mutation>
      )}
    </Block>
  )
}
export default VerifyBlock
