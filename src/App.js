import { useState, useEffect } from 'react'
import { API } from './utils/API'

import Cards from './components/Cards'

function App() {
  const responseType = 'token'
  const redirectURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://cobypear.github.io/twitch-mtg-legacy-finder' // replace with production URI
  const scopes = 'openid'
  // console.log(process.env.REACT_APP_CLIENT_ID)
  const claims = ''
  const token = window.location.href.split('=')[1]?.split('&')[0] || ''

  const URL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&claims=${claims}&force_verify=true`

  const [legacyStreams, setLegacyStreams] = useState([])
  const [currentPage, setCurrentPage] = useState()
  const [closed, setClosed] = useState(JSON.parse(localStorage.getItem('closed')) || false);
  const [filter, setFilter] = useState('legacy')

  useEffect(() => {
    if (token) {
      const cherryPickStreams = streams => {
        let filtered = streams?.filter(stream => stream.title.toLowerCase().includes(filter))
        // console.log(...filtered)
        let newStreams = [...new Set(filtered)]
        // console.log(newStreams)
        setLegacyStreams(prevState => {
          return prevState ? [...prevState, ...newStreams] : [...newStreams]
        })
      }
      (async () => {
        const { data, pagination } = await API.getStreams(token)
        setCurrentPage(pagination.cursor)
        cherryPickStreams(data)
      })()
    }
  }, [token, filter])


  useEffect(() => {
    window.onscroll = function () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        nextPage()
      }
    }
  })


  // pick out streams based on filter. default legacy
  const cherryPickStreams = streams => {
    let filtered = streams?.filter(stream => stream.title.toLowerCase().includes(filter))
    // console.log(...filtered)
    let newStreams = [...new Set(filtered)]
    // console.log(newStreams)
    setLegacyStreams(prevState => {
      return prevState ? [...prevState, ...newStreams] : [...newStreams]
    })
  }


  // call the API again, ask for the next page
  const nextPage = async () => {
    if (currentPage) {
      const { data, pagination } = await API.getNextPage(token, currentPage)
      setCurrentPage(pagination.cursor ? pagination.cursor : '')
      cherryPickStreams(data)
    }
  }

  const hideMessage = () => {
    setClosed(!closed)
    localStorage.setItem('closed', !closed)
  }


  return (
    <div className='main-container'>
      <button
      onClick={() => {
        const cards = document.getElementById('cards')
        cards.innerHTML =''
        setFilter(filter === 'legacy' ? 'modern' : 'legacy')
      }}>
        switch to {`${filter === 'legacy' ? 'modern' : 'legacy'}`}
      </button>
      {
        !closed ? (
        <div className="message" style={{ display: closed ? 'none' : 'flex' }}>
          <h1>Welcome to Twitch M:tG Legacy Finder</h1>
          <button onClick={hideMessage}>x</button>
          <p>How does it work?</p>
          <p>1. Click Login to login to your Twitch account <a href="https://github.com/CobyPear/twitch-mtg-legacy-finder#question-why-do-i-need-to-login-to-twitch" id='why'>Why do I need to do this?</a></p>
          <p>2. Browse live Magic: the Gathering streamers currently playing the best (Legacy) format</p>
          <p>3. ???</p>
          <p>4. Profit!</p>
          <a className='link-button' href={URL}>Login</a>
        </div>
        ) : (
          <button id='show-message' onClick={hideMessage}>show message</button>
        )

      }
      { legacyStreams && <Cards legacyStreams={legacyStreams} />}

      <footer id='footer'>
        <span>&copy; <a href="https://cobysher.dev">Coby Sher</a> 2021</span>
      </footer>
    </div>
  );
}

export default App;
