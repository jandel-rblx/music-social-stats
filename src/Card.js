import React from "react";
import RollingNumber from "./RollingNumber";

import "./Card.scss";

class Card extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <a className="card" href={`https://www.roblox.com/games/${this.props.info.gameId}`}>
                <div className="container">
                    <img className="thumbnail" src={this.props.info.spotifyThumbnail || this.props.info.youtubeThumbnail} alt="Song Icon"></img>
                    <b className="name info">{this.props.info.name}</b>
                    <p className="views info"><i className="fa fa-spotify"/> <b>{<RollingNumber goal={this.props.info.spotifyStreams}/>}</b> Streams</p>
                    <p className="views info"><i className="fa fa-youtube"/> <b>{<RollingNumber goal={this.props.info.youtubeStreams}/>}</b> Streams</p>
                </div>
            </a>
        )
    }
}

export default Card;