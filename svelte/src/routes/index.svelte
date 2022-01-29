<script context='module'>
  import { API } from '$lib/utils/API';
  import { getSession } from '../hooks/index'
  let token;

  export const load = async ({ session }) => {
    console.log(session)
    const { access_token } = session
    const streams = access_token && await API.getStreams(access_token)
    // const resp = await req.json()

    return {
      props: streams
    }
  };
</script>

<script>
  export let streams;
  console.log(streams)
</script>
<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
