import {
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
} from 'apollo-boost'
import { createUploadLink } from 'apollo-upload-client'
import withApollo from 'next-with-apollo'
function createClient({ headers = {}, initialState = {} }) {
  if (headers[':method']) delete headers[':method']
  if (headers[':authority']) delete headers[':authority']
  if (headers[':scheme']) delete headers[':scheme']
  if (headers[':path']) delete headers[':path']
  return new ApolloClient({
    link: createUploadLink({
      uri: process.env.API_URL,
      credentials: 'include',
      headers,
    }),
    cache: new InMemoryCache({
      dataIdFromObject: object => {
        switch (object.__typename) {
          case 'Me':
            return 'Me'
          default:
            return defaultDataIdFromObject(object)
        }
      },
    }).restore(initialState),
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
  })
}
export default withApollo(createClient)
