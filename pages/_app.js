import '../src/styles/base.css'
import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApolloClient from '../src/hoc/with-apollo-client'
import { Page } from '../src/components'
class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
  }
  render() {
    const { Component, pageProps, apollo } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}
export default withApolloClient(CustomApp)
