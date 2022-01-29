import { API } from '$lib/utils/API'
import * as cookie from 'cookie'

export const getSession = async (event) => {
  return event.locals.token ? event.locals.token : {}
}
export const handle = async ({ event, resolve }) => {
  // get session token, if it's not there, get
  // the token from the api then store it
  // in http only cookie
  const cookies = cookie.parse(event.request.headers.get('cookie') || '')
  console.log('current cookies', cookies)
  let session = await getSession(event)
  console.log('session', session)
  console.log('date.now, expires_in', Math.floor(Date.now() / 1000), session.expires_in)

  if (!session.access_token) {
    token = await API.getToken()
    event.locals.token = token
    for (key of Object.keys(token)) {
      event.request.headers = { ...event.request.headers, 'Set-Cookie': cookie.serialize(key, token[key], { httpOnly: true }) }
    }
  }
  // need to set the HTTP Only token here somehow
  // only when page loads for first time
  // if there is no token.
  console.log('event after:', event)
  const response = await resolve(event)

  return response

}