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
        console.log('inside if token!');
        res = await api.getStreams(session);
      }
      const { data, pagination } = res;
      console.log(pagination);
      return {
        props: {
          streams: data,
          cursor: pagination,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  };
</script>

<script>
  import { session } from '$app/stores';
  console.log($session);
  // const session = document.cookie

  export let streams, cursor;
  console.log(streams);
  let format = 'legacy';
  const options = ['standard', 'alchemy', 'legacy', 'modern', 'pauper'];

  const loadNext = async () => {
    const { data, pagination } = await api.getNextPage($session, cursor);
    console.log(data, pagination);
    streams = data;
    cursor = pagination.cursor;
  };

  const loadPrev = async () => {
    const { data, pagination } = await api.getPrevPage($session, cursor);
    console.log(data, pagination);
    streams = data;
    cursor = pagination.cursor;
  };
</script>

<!-- select format -->
<select bind:value={format}>
  {#each options as option}
    <option>{option}</option>
  {/each}
</select>
<!-- /select format -->
<!-- load more -->
<button on:click={() => loadNext()}>next page</button>
<button on:click={() => loadPrev()}>back</button>
<!-- /load more -->
<!-- streams -->
{#each streams.filter(({ title }) => title
    .toLowerCase()
    .includes(format)) as stream (stream.id)}
  {#if !stream}
    <p>
      No streams for {format} at the moment. Try again later or try another format!
    </p>
  {/if}
  {#await stream then stream}
    <h2>{stream.title}</h2>
    <h3>{stream.user_name}</h3>
    <img
      src={stream.thumbnail_url
        .replace('{width}', '300')
        .replace('{height}', '150')}
      alt={`${stream.user_name}'s stream preview`} />
  {:catch error}
    <p>there was an error :\ {error}</p>
  {/await}
{/each}
<!-- /streams -->
