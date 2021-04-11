import React from 'react'
import StreamerCard from './StreamerCard'

const Cards = ({legacyStreams}) => {
    return (
        <>
            {   legacyStreams?.length &&
                legacyStreams?.map(stream => {
                    return <StreamerCard
                        key={stream.id}
                        title={stream.title}
                        streamer={stream.user_name}
                        thumbnail={stream.thumbnail_url}
                    />

                })
            }
        </>
    )
}

export default Cards
