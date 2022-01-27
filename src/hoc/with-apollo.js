import 'isomorphic-unfetch'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createUploadLink } from 'apollo-upload-client'
import withApollo from 'next-with-apollo'
import { API_URL } from '../../config'
function createClient({ headers, initialState = {} }) {
  if (typeof headers === 'object') {
    delete headers[':method']
    delete headers[':authority']
    delete headers[':scheme']
    delete headers[':path']
  }
  return new ApolloClient({
    ssrMode: !process.browser,
    cache: new InMemoryCache({
      dataIdFromObject: ({ id, __typename }) =>
        id && __typename ? __typename + id : null,
    }).restore(initialState),
    link: createUploadLink({
      uri: API_URL,
      credentials: 'include',
      headers,
    }),
  })
}
export default withApollo(createClient)
