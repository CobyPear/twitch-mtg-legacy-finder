import { client } from '$lib/utils/API';



export const get = async ({ locals: { token } }) => {
  if (token) {
    const { data, pagination } = await client.getStreams(token)
    
    return {
      body: {
        streams: data,
        cursor: pagination,
      }
    }
  }
  return {
    body: {
      error: 'Unauthorized'
    },
    status: 401
  }
}
