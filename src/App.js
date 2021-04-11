import { useState, useEffect } from 'react'
import { API } from './utils/API'

import Cards from './components/Cards'

function App() {
  const responseType = 'token'
  const redirectURI = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '' // replace with production URI
  const scopes = 'openid'
  // console.log(process.env.REACT_APP_CLIENT_ID)
  const claims = ''
  const token = window.location.href.split('=')[1]?.split('&')[0] || ''

  const URL = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${redirectURI}&response_type=${responseType}&scope=${scopes}&claims=${claims}&force_verify=true`

  let [legacyStreams, setLegacyStreams] = useState([])
  let [currentPage, setCurrentPage] = useState()
  console.log(legacyStreams)

  useEffect(()=> {
    if (token) {
      (async () =>{
        const { data, pagination} = await API.getStreams(token)
        setCurrentPage(pagination.cursor)
        cherryPickStreams(data)
        
      })()
    }
  }, [token])


  useEffect(() => {
    window.onscroll = function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        nextPage()
      }
    }
  })


  const cherryPickStreams = streams => {
    let filtered = streams?.filter(stream => stream.title.toLowerCase().includes('legacy'))
    // console.log(...filtered)
    let newStreams = [...new Set(filtered)]
    console.log(newStreams)
    setLegacyStreams(prevState => {
      return prevState ? [...prevState, ...newStreams] : [...newStreams]
    })

  }


  const nextPage = async () => {
    console.log('hello')
    // console.log(token)
    if (currentPage) {
      const { data, pagination } = await API.getNextPage(token,currentPage)
      setCurrentPage(pagination.cursor ? pagination.cursor : '')
      cherryPickStreams(data)
      console.log(currentPage)
      console.log('debug', legacyStreams)
    }
  }


  return (
    <div className='main-container'>
      <a href={URL}>Login</a>
     { legacyStreams && <Cards legacyStreams={legacyStreams} />}
    </div>
  );
}

export default App;
