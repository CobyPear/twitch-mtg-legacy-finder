import { API } from '$lib/utils/API';
export const api = new API(
  import.meta.env.VITE_CLIENT_ID,
  import.meta.env.VITE_CLIENT_SECRET,
);


export const get = async ({ locals: { token } }) => {
  if (token) {
    const { data, pagination } = await api.getStreams(token)
    
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
