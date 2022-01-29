import App, { Container } from 'next/app'
import Router from 'next/router'
import { ApolloProvider } from 'react-apollo'
import { Page } from '../src/components'
import withApollo from '../src/hoc/with-apollo'
import { initGA, logPageView } from '../src/lib/google-analytics'
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
  }
  componentDidMount() {
    initGA()
    logPageView()
    Router.router.events.on('routeChangeComplete', logPageView)
  }
  render() {
    const { Component, apollo, pageProps } = this.props
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
export default withApollo(MyApp)
