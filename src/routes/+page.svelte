<script>
  import { page } from '$app/stores';
  export let data;
  let { streams, cursor } = data;
  const filterStreams = (s, format) =>
    s?.filter(({ title }) => title.toLowerCase().includes(format));

  const options = ['standard', 'alchemy', 'legacy', 'modern', 'pauper'];
  let filter = false;
  let isMature = false;
  $: format = filter ? 'legacy' : '';
  const loadNext = async () => {
    const res = await fetch(`/api/page/next?cursor=${cursor}`);
    const data = await res.json();
    if (data) {
      streams = [...data.streams];
      cursor = data.cursor ? data.cursor : cursor;
    }
    // streams = data.streams;
    // cursor = data.cursor;
    // try {
    //   // console.log(cursor);
    //   const { data, pagination } = await client.getNextPage(
    //     $page.data.session,
    //     cursor,
    //   );
    //   if (data) {
    //     // console.log(streams, pagination);
    //     streams = data;
    //     cursor = pagination;
    //   }
    // } catch (error) {
    //   throw new Error('no next page', error);
    // }
  };

  const reload = async () => {
    const res = await fetch(`/api/page/prev?cursor=${cursor}`);
    const data = await res.json();
    if (data) {
      streams = [...data.streams];
      cursor = data.cursor ? data.cursor : cursor;
    }
    // streams = dat
    // try {
    //   const { data, pagination } = await client.getPrevPage(
    //     $page.data.session,
    //     cursor,
    //   );
    //   if (data) {
    //     console.log(streams, pagination);
    //     streams = data;
    //     cursor = pagination;
    //   }
    // } catch (error) {
    //   throw new Error('no prev page', error);
    // }
  };
</script>

<!-- filters-->
<div class="sticky">
  <section>
    <label for="filter-checkbox">show mature?</label>
    <input name="filter-checkbox" bind:checked={isMature} type="checkbox" />
    <label for="filter-checkbox">filter by format</label>
    <input name="filter-checkbox" bind:checked={filter} type="checkbox" />

    {#if filter}
      <!-- select format -->
      <select bind:value={format}>
        {#each options as option}
          <option>{option}</option>
        {/each}
      </select>
      <!-- /select format -->
    {:else}
      <label for="search">search</label>
      <input name="search" type="text" bind:value={format} />
    {/if}
  </section>

  <!-- load more -->
  <section>
    <button on:click={loadNext}>show more</button>
    <button on:click={() => reload()}>back</button>
  </section>
  <!-- /load more -->
  <!-- /filters-->
</div>

<main>
  <!-- streams -->
  {#each filterStreams(streams, format) as stream (stream.id)}
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

<style>
  .sticky {
    position: sticky;
    top: 0;
  }
</style>
