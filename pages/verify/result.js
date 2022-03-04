import React, { useEffect } from 'react'
import { Mutation } from 'react-apollo'
import { ErrorMessage, Loader, Logo } from '../../src/components'
import { VERIFY_MUTATION } from '../../src/lib/mutations'
import styles from './styles.css'
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
function Result({ token }) {
  return (
    <div className={styles.block}>
      <Logo />
      {!token ? (
        <h3>Ошибка! Не пытайтесь верифицировать аккаунт без токена!</h3>
      ) : (
        <Mutation mutation={VERIFY_MUTATION} variables={{ token }}>
          {(verify, result) => <Success verify={verify} {...result} />}
        </Mutation>
      )}
    </div>
  )
}
export default Result
