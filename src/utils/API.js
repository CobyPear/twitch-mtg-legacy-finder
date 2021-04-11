export const API = {
    getStreams: async function(token) {
        try {
            // mtg game id: 2748
            const req = await fetch('https://api.twitch.tv/helix/streams?game_id=2748&first=100', {
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