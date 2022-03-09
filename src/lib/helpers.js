import Router from 'next/router'
import { CHECK_LOGGED_IN_QUERY } from './queries'
const dev = process.env.NODE_ENV === 'development'
export function getPhoto(url) {
  if (typeof url === 'string') return dev ? `http:
  return '/static/images/user-placeholder.svg'
}
export function redirect(ctx, target) {
  if (ctx.res) {
    ctx.res.writeHead(303, { Location: target })
    ctx.res.end()
  } else {
    Router.replace(target)
  }
}
export const checkLoggedIn = apolloClient =>
  apolloClient
    .query({ query: CHECK_LOGGED_IN_QUERY })
    .then(({ data }) => ({ me: data.me }))
    .catch(() => ({ me: null }))
