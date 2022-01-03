import React from 'react'
import { Mutation } from 'react-apollo'
import { CURRENT_USER_QUERY } from '../lib/queries'
import { SIGN_OUT_MUTATION } from '../lib/mutations'
function Signout() {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {signout => (
        <button type="button" onClick={signout}>
          Выход
        </button>
      )}
    </Mutation>
  )
}
export default Signout
