<script context="module">
  import { API } from '$lib/utils/API';
  export const api = new API(
    import.meta.env.VITE_CLIENT_ID,
    import.meta.env.VITE_CLIENT_SECRET,
  );

  export const load = async ({ session }) => {
    try {
      let res;
      if (session) {
        console.log('inside if token!')
        res = await api.getStreams(session);
      }
      const { data, pagination } = res
      return {
        props: {
          streams: data,
          pagination
        },
      };
    } catch (error) {
      throw new Error(error)
    }
  };
</script>

<script>
  export let streams;
</script>

{#each streams as stream}
  <h2>{stream.title}</h2>
  <h3>{stream.user_name}</h3>
  <img
    src={stream.thumbnail_url
      .replace('{width}', '300')
      .replace('{height}', '150')}
    alt={`${stream.user_name}'s stream preview`} />
{/each}