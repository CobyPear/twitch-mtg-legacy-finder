<script context="module">
</script>

<script>
  export let streams, cursor;
  // // console.log(streams);
  // const filterStreams = (s, format) =>
  //   s?.filter(({ title }) => !title.toLowerCase().includes(format));

  // import { session } from '$app/stores';

  // export let options;
  // export let filter;
  // export let isMature;
  // $: format = filter ? 'legacy' : '';
  // const loadNext = async () => {
  //   try {
  //     console.log(cursor);
  //     const resp = await api.getNextPage($session, cursor);
  //     if (resp) {
  //       console.log(data, pagination);
  //       streams = data;
  //       cursor = pagination.cursor;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('no next page');
  //   }
  // };

  // const reload = async () => {
  //   try {
  //     console.log(cursor);
  //     const resp = await api.getStreams($session, cursor);
  //     if (resp.ok) {
  //       const { data, pagination } = resp;
  //       console.log(data, pagination);
  //       streams = data;
  //       cursor = pagination ? pagination : '';
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error('no prev page', error);
  //   }
  // };
</script>

<main>
  <!-- streams -->
  {#each streams as stream (stream.id)}
    <h2>{stream.title}</h2>
    <h3>{stream.user_name}</h3>
    <img
      src={stream.thumbnail_url
        .replace('{width}', '300')
        .replace('{height}', '150')}
      alt={`${stream.user_name}'s stream preview`} />
  {/each}
  <!-- /streams -->
</main>
