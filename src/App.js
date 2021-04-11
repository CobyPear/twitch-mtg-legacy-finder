import { useState, useEffect } from 'react'
import { API } from './utils/API'

import Cards from './components/Cards'

function App() {
  const responseType = 'token'
  const redirectURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '' // replace with production URI
  const scopes = 'openid'
  // console.log(process.env.REACT_APP_CLIENT_ID)
  const claims = ''

  const URL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&claims=${claims}&force_verify=true`

  let [legacyStreams, setLegacyStreams] = useState([])
  let [currentPage, setCurrentPage] = useState()

  const cherryPickStreams = streams => {
    let filtered = streams?.filter(stream => stream.title.toLowerCase().includes('legacy'))
    // console.log(...filtered)

    setLegacyStreams(prevState => {
      return [...prevState, ...filtered]
    })
  }

  const buttonClick = async () => {
    const token = window.location.href.split('=')[1].split('&')[0]
    // console.log(token)


      const { data, pagination} = await API.getStreams(token)
      // console.log(resp)
      setCurrentPage(pagination.cursor)
      // console.log(currentPage)

      cherryPickStreams(data)

      console.log(legacyStreams)

  }

  const nextPage = async () => {
    const token = window.location.href.split('=')[1].split('&')[0]
    // console.log(token)
    try {
      const req = await fetch(`https://api.twitch.tv/helix/streams?game_id=2748&after=${currentPage}`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "client-id": process.env.REACT_APP_CLIENT_ID,
        }
      })

      const resp = await req.json()
      // console.log(resp)

      cherryPickStreams(resp.data)


      console.log(legacyStreams)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <a href={URL}>Login</a>
      <button
        onClick={buttonClick}>
        Search Twitch
     </button>
      <button
        onClick={nextPage}>
        next
     </button>
     {
        <Cards legacyStreams={legacyStreams} />
     }
    </>
  );
}

export default App;
