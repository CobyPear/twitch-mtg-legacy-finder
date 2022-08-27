import { client } from '$lib/utils/client';
import * as cookie from 'cookie';

/** @type {import('./$types').load} */
export const load = async ({ locals }) => {
  if (locals.token) {
    const {
      data,
      pagination: { cursor: cursor },
    } = await client.getStreams(locals.token);
    return {
      streams: data,
      cursor,
    };
  }
  return {
    body: {
      error: 'Unauthorized',
    },
    status: 401,
  };
};

