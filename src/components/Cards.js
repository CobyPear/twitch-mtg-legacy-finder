import React from 'react'
import StreamerCard from './StreamerCard'

const Cards = ({legacyStreams}) => {
    return (
        <div id='cards'>
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
                    <p style={{textAlign: 'center'}}>Login to view active streams</p>
                )
            }
        </div>
    )
}

export default Cards
