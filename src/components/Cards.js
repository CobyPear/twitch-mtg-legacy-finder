import React from 'react'
import StreamerCard from './StreamerCard'

const Cards = ({legacyStreams, token}) => {
    return (
        <div id='resp'>
            {   legacyStreams?.length ?(
                legacyStreams?.map(stream => {
                    return <StreamerCard
                        key={stream.id}
                        title={stream.title}
                        streamer={stream.user_name}
                        thumbnail={stream.thumbnail_url}
                    />

                })
                ) : (
                    <p style={{textAlign: 'center'}}>{token ? `No live streamers at the moment. Try again later, or switch to a different format` : `Please login to view live streamers`}</p>
                )
            }
        </div>
    )
}

export default Cards
