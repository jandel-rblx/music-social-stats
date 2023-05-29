import React from "react";
import RollingNumber from "./RollingNumber";

import "./Card.scss";

class Card extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="card">
                <div className="container">
                    <img className="thumbnail" src={this.props.info.spotifyThumbnail || this.props.info.youtubeThumbnail} alt="Song Icon"></img>
                    <b className="name info">{this.props.info.name}</b>
                    <a href={`https://open.spotify.com/track/${this.props.info.spotifyId}`} className={`views info ${this.props.info.spotifyId ? "active" : "inactive"}`}><i className="fa fa-spotify"/> <b>{<RollingNumber goal={this.props.info.spotifyStreams}/>}</b> Streams</a>
                    <a href={`https://www.youtube.com/watch?v=${this.props.info.youtubeId}`} className={`views info ${this.props.info.youtubeId ? "active" : "inactive"}`}><i className="fa fa-youtube"/> <b>{<RollingNumber goal={this.props.info.youtubeStreams}/>}</b> Streams</a>
                </div>
            </div>
        )
    }
}

export default Card;