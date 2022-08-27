import { client } from '$lib/utils/client';
import * as cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
  // console.log('event', event);
  // get session token, if it's not there, get
  // the token from the api then store it
  // in http only cookie
  const cookies = cookie.parse(event.request.headers.get('cookie'));
  if (cookies.token && cookies.token !== 'undefined') {
    event.locals.token = cookies.token;

    const response = await resolve(event);
    return response;
  }

  let session = event.locals.token;
  let token;

  if (!session || !cookies.token) {
    token = await client.getToken();
    event.locals.token = token.access_token;
  }

  // need to set the HTTP Only token here
  // only when page loads for first time
  // if there is no token.
  const response = await resolve(event);

  const cookieValue = cookie.serialize('token', token.access_token, {
    path: '/',
    httpOnly: true,
    maxAge: token.expires_in,
  });
  response.headers.set('Set-Cookie', cookieValue);

  return response;
};
