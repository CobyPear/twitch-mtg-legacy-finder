export const API = {
  base_url: 'https://api.twitch.tv',
  CLIENT_ID: import.meta.env.DEV ? import.meta.env.VITE_CLIENT_ID : process.env.CLIENT_ID,
  CLIENT_SECRET: import.meta.env.DEV ? import.meta.env.VITE_CLIENT_SECRET : process.env.CLIENT_SECRET,
  setToken(token) {
    this.token = token
  },
  getToken: async function () {
    try {
      const req = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: 'POST'
      })
      const resp = await req.json()

      return resp

    } catch (error) {
      throw new Error(error)
    }
  },
  getStreams: async function (token) {
    console.log(token)
    try {
      // mtg game id: 2748
      const req = await fetch(`${this.base_url}/helix/streams?game_id=2748&first=100`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "client-id": this.CLIENT_ID
        }
      })
      const resp = await req.json()
      console.log(resp)
      return resp

    } catch (error) {
      console.log(error)
    }
  },
  getNextPage: async function (token, currentPage) {
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