import { client } from '$lib/utils/client';
import { error } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
  const token = locals.token;
  const pageCursor = url.searchParams.get('cursor');
  try {
    const {
      data,
      pagination: { cursor: cursor },
    } = await client.getNextPage(token, pageCursor);
    if (data) {
      return new Response(
        JSON.stringify({
          streams: data,
          cursor,
        }),
      );
    }
  } catch (err) {
    console.error(err.message)
    throw error(404, 'no next page');
  }
};

