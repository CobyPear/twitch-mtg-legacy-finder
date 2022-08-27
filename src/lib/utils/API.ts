export class API {
  base_url: string;
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;

  constructor(CLIENT_ID, CLIENT_SECRET) {
    this.CLIENT_ID = CLIENT_ID;
    this.CLIENT_SECRET = CLIENT_SECRET;
    this.base_url = 'https://api.twitch.tv';
  }
  async getToken() {
    try {
      const req = await fetch(
        `https://id.twitch.tv/oauth2/token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&grant_type=client_credentials`,
        {
          method: 'POST',
        },
      );
      const resp = await req.json();

      return resp;
    } catch (error) {
      console.error(error);
    }
  }
  async getStreams(token) {
    try {
      // mtg game id: 2748
      const req = await fetch(
        `${this.base_url}/helix/streams?game_id=2748&first=100`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'client-id': this.CLIENT_ID,
          },
        },
      );
      const resp = await req.json();
      return resp;
    } catch (error) {
      console.error(error);
    }
  }
  async getNextPage(token, { cursor }) {
    console.log(token);
    try {
      if (!cursor) return;
      const req = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=2748&first=100&after=${cursor}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'client-id': this.CLIENT_ID,
          },
        },
      );
      const resp = await req.json();
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
  async getPrevPage(token, { cursor }) {
    console.log(token);
    try {
      if (!cursor) return;
      const req = await fetch(
        `https://api.twitch.tv/helix/streams?game_id=2748&first=100&before=${cursor}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'client-id': this.CLIENT_ID,
          },
        },
      );
      const resp = await req.json();
      return resp;
    } catch (error) {
      console.log(error);
    }
  }
}

export const client = new API(
  import.meta.env.VITE_CLIENT_ID,
  import.meta.env.VITE_CLIENT_SECRET,
);

