<script>
  import { client } from '$lib/utils/API';
  export let streams, cursor;
  const filterStreams = (s, format) =>
    s?.filter(({ title }) => title.toLowerCase().includes(format));

  import { session } from '$app/stores';

  const options = ['standard', 'alchemy', 'legacy', 'modern', 'pauper'];
  let filter = false;
  let isMature = false;
  $: format = filter ? 'legacy' : '';
  const loadNext = async () => {
    try {
      console.log(cursor);
      const { data, pagination } = await client.getNextPage($session, cursor);
      if (data) {
        console.log(streams, pagination);
        streams = data;
        cursor = pagination;
      }
    } catch (error) {
      throw new Error('no next page', error);
    }
  };

  const reload = async () => {
    try {
      const { data, pagination } = await client.getPrevPage($session, cursor);
      if (data) {
        console.log(streams, pagination);
        streams = data;
        cursor = pagination;
      }
    } catch (error) {
      throw new Error('no prev page', error);
    }
  };
</script>

<!-- filters-->
<div>
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
</div>

<!-- load more -->
<div>
  <button on:click={() => loadNext()}>show more</button>
  <button on:click={() => reload()}>back</button>
</div>
<!-- /load more -->
<!-- /filters-->

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
