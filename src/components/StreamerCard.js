import React from 'react'

const StreamerCard = ({ title, streamer, thumbnail }) => {
    console.log(thumbnail.toString().replace('{width}', '250').replace('{height}', '250'))
    let thumb = thumbnail.toString().replace('{width}', '500').replace('{height}', '250')
    return (
        <div className='card'>
            <div className="card-header">
                <h1>{streamer}</h1>
            </div>
            <div className="card-body">
                <h2>{title}</h2>
                <div className="img-link-container">
                    <a href={`https://twitch.tv/${streamer}`}>
                        <img src={thumb} alt={`${streamer}'s stream thumbnail`} />
                    </a>
                    <a href={`https://twitch.tv/${streamer}`}>
                        Go to {streamer}'s stream!
                    </a>
                </div>
            </div>
        </div>
    )
}

export default StreamerCard
