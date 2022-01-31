export class API {
  base_url = 'https://api.twitch.tv'

  constructor(CLIENT_ID, CLIENT_SECRET) {
    this.CLIENT_ID = CLIENT_ID
    this.CLIENT_SECRET = CLIENT_SECRET
  }
  async getToken() {
    try {
      const req = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST',
      })
      const resp = await req.json()

      return resp

    } catch (error) {
      throw new Error(error)
    }
  }
  async getStreams(token) {
    try {
      // mtg game id: 2748
      console.log('api token: ', token)
      const req = await fetch(`${this.base_url}/helix/streams?game_id=2748&first=100`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "client-id": this.CLIENT_ID
        }
      })
      const resp = await req.json()
      return resp

    } catch (error) {
      console.log(error)
    }
  }
  async getNextPage(token, currentPage) {
    try {
      const req = await fetch(`https://api.twitch.tv/helix/streams?game_id=2748&first=100&after=${currentPage}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "client-id": process.env.REACT_APP_CLIENT_ID,
        }
      })
      const resp = await req.json()
      return resp

    } catch (error) {
      console.log(error)
    }
  }
}
