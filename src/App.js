import { useState, useEffect } from 'react'
import { API } from './utils/API'

import Cards from './components/Cards'

function App() {
  const responseType = 'token'
  const redirectURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://cobypear.github.io/twitch-mtg-legacy-finder' // replace with production URI
  const scopes = 'openid'
  // console.log(process.env.REACT_APP_CLIENT_ID)
  const claims = ''

  const URL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&claims=${claims}&force_verify=true`

  const [legacyStreams, setLegacyStreams] = useState([])
  const [currentPage, setCurrentPage] = useState()
  const [closed, setClosed] = useState(JSON.parse(localStorage.getItem('closed')) || false);
  const [filter, setFilter] = useState(JSON.parse(localStorage.getItem('format')) || 'legacy')
  const [access_token, setToken] = useState('')

  useEffect(() => {
    setToken(window.location.href.split('=')[1]?.split('&')[0])
  }, [access_token])

  useEffect(() => {
    if (access_token) {
      const cherryPickStreams = streams => {
        let filtered = streams?.filter(stream => stream.title.toLowerCase().includes(filter))
        // console.log(...filtered)
        let newStreams = [...new Set(filtered)]
        // console.log(newStreams)
        setLegacyStreams(prevState => {
          // console.log(prevState)
          return [...newStreams]
        })
      }
      (async () => {
        const { data, pagination } = await API.getStreams(access_token)
        setCurrentPage(pagination?.cursor)
        cherryPickStreams(data)
      })()
    }
  }, [access_token, filter])


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
    console.log(legacyStreams)
  }


  // call the API again, ask for the next page
  const nextPage = async () => {
    if (currentPage) {
      const { data, pagination } = await API.getNextPage(access_token, currentPage)
      setCurrentPage(pagination.cursor ? pagination.cursor : '')
      cherryPickStreams(data)
    }
  }

  const hideMessage = () => {
    setClosed(!closed)
    localStorage.setItem('closed', !closed)
  }


  return (
    <div className='main-container' href='#'>
      <div className="row">
        <button
          id='filter-btn'
          onClick={() => {
            setFilter(filter === 'legacy' ? 'modern' : 'legacy')
            localStorage.setItem('format', JSON.stringify(filter === 'legacy' ? 'modern' : 'legacy'))
          }}>
          switch to {`${filter === 'legacy' ? 'modern' : 'legacy'}`}
        </button>
        <a className='link-button' id='login' href={URL}>Login</a>
        {closed && <button id='show-message' onClick={hideMessage}>show message</button>}
      </div>
      {
        !closed && (
          <div className="row">
            <div className="message" style={{ display: closed ? 'none' : 'inline-block' }}>
              <h1>Welcome to Twitch M:tG Legacy Finder</h1>
              <button onClick={hideMessage}>x</button>
              <p>How does it work?</p>
              <p>1. Click Login to login to your Twitch account <a href="https://github.com/CobyPear/twitch-mtg-legacy-finder#question-why-do-i-need-to-login-to-twitch" id='why'>Why do I need to do this?</a></p>
              <p>2. Browse live Magic: the Gathering streamers currently playing the best (Legacy) format</p>
              <a className='link-button' href={URL}>Login</a>
            </div>
          </div>
        )
      }
      <div id='cards'>
        {legacyStreams && <Cards legacyStreams={legacyStreams} token={access_token} />}
      </div>
      <button
        id='to-top'
        // onClick={() => window.location = '#'}
        >
          <a href="#">
            ^
          </a>
        
          </button>

      <footer id='footer'>
        <span>&copy; <a href="https://cobysher.dev">Coby Sher</a> 2021</span>
      </footer>
    </div>
  );
}

export default App;
