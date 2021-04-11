import React from 'react'

const StreamerCard = ({ title, streamer, thumbnail }) => {
    let thumb = thumbnail.toString().replace('{width}', '500').replace('{height}', '250')
    return (
        <div className='card'>
            <div className="card-header">
                <h1>{streamer}</h1>
            </div>
            <div className="card-body">
                <h2>{title}</h2>
                <div className="img-link-container">
                    <a target='_blank' rel='noreferrer' href={`https://twitch.tv/${streamer}`}>
                        <img src={thumb} alt={`${streamer}'s stream thumbnail`} />
                        <span className="tooltip" data-text={`click to open ${streamer}'s stream`}>
                        </span>
                    </a>
                    <div className="spacer"></div>
                    <a className='link-button' rel='noreferrer' target='_blank' href={`https://twitch.tv/${streamer}`}>
                        Go to {streamer}'s stream!
                    </a>
                </div>
            </div>
        </div>
    )
}

export default StreamerCard
