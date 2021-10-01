import App, { Container } from 'next/app'
import Router from 'next/router'
import { ApolloProvider } from 'react-apollo'
import Page from '../components/Page'
import { initGA, logPageView } from '../lib/google-analytics'
import withApollo from '../lib/with-apollo'
import withSentry from '../lib/sentry'
import 'normalize.css'
const { captureException } = withSentry({ release: process.env.SENTRY_RELEASE })
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    try {
      let pageProps = {}
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      pageProps.query = ctx.query
      return { pageProps }
    } catch (error) {
      captureException(error, ctx)
    }
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
