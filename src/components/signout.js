import React from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import { meFragment } from '../lib/fragments'
import { SIGN_OUT_MUTATION } from '../lib/mutations'
function Signout() {
  return (
    <Mutation
      mutation={SIGN_OUT_MUTATION}
      update={cache => {
        cache.writeFragment({
          id: 'Me',
          fragment: meFragment,
          data: {
            id: '-1',
            username: '',
            photo: '',
            info: '',
            email: '',
            isVerified: false,
          },
        })
      }}
    >
      {signout => (
        <button
          type="button"
          onClick={() => {
            signout()
            Router.push('/signin')
          }}
        >
          Выход
        </button>
      )}
    </Mutation>
  )
}
export default Signout
