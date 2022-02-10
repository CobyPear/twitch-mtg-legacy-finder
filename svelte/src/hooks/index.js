import { client } from '../routes/index.js'
import * as cookie from 'cookie'

export const getSession = async (event) => {
  return event.locals.token ? event.locals.token : {}
}
export const handle = async ({ event, resolve }) => {
  // get session token, if it's not there, get
  // the token from the api then store it
  // in http only cookie
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  if (cookies.token) {
    event.locals.token = cookies.token

    const response = await resolve(event)
    return response
  }

  let session = await getSession(event)
  let token;

  if (!session.access_token || !cookies.token) {
    token = await client.getToken()
    event.locals.token = token.access_token
  }

  // need to set the HTTP Only token here
  // only when page loads for first time
  // if there is no token.
  const response = await resolve(event)

  const cookieValue = cookie.serialize('token', token.access_token, {
    path: '/',
    httpOnly: true,
    maxAge: token.expires_in
  })
  response.headers.set('Set-Cookie', cookieValue)

  return response

}