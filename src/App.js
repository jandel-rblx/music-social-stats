import React from 'react';

import './App.scss';
import './Wheel.scss';

import Music from './API/Music';

import Songs from "./Songs.json";
import Card from './Card';
import RollingNumber from './RollingNumber';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            songInfo: {},
            totalStreams: 0
        }

        Songs.forEach((song_info) => {
            if (song_info.spotify_id != null) {
                Music.spotify_song_map[song_info.spotify_id] = song_info.name;
            }

            if (song_info.youtube_id != null) {
                Music.youtube_song_map[song_info.youtube_id] = song_info.name;
            }
        })
    }

    refresh = async () => {
        const spotify_stats = await Music.getSongInfo(Object.keys(Music.spotify_song_map), "spotify");
        const youtube_stats = await Music.getSongInfo(Object.keys(Music.youtube_song_map), "youtube");

        let combined_song_info = {};

        Object.keys(spotify_stats.mainData).forEach((song_name) => {
            if (!combined_song_info[song_name]) {
                combined_song_info[song_name] = {
                    totalStreams: 0,
                    spotifyStreams: 0,
                    youtubeStreams: 0
                }
            }

            combined_song_info[song_name].totalStreams += spotify_stats.mainData[song_name].streams
            combined_song_info[song_name].spotifyStreams = spotify_stats.mainData[song_name].streams
            combined_song_info[song_name].spotifyThumbnail = spotify_stats.mainData[song_name].thumbnail
            combined_song_info[song_name].spotifyId = spotify_stats.mainData[song_name].id
            combined_song_info[song_name].name = song_name
        })

        Object.keys(youtube_stats.mainData).forEach((song_name) => {
            if (!combined_song_info[song_name]) {
                combined_song_info[song_name] = {
                    totalStreams: 0,
                    spotifyStreams: 0,
                    youtubeStreams: 0
                }
            }

            combined_song_info[song_name].totalStreams += youtube_stats.mainData[song_name].streams
            combined_song_info[song_name].youtubeStreams = youtube_stats.mainData[song_name].streams
            combined_song_info[song_name].youtubeThumbnail = youtube_stats.mainData[song_name].thumbnail
            combined_song_info[song_name].youtubeId = youtube_stats.mainData[song_name].id
            combined_song_info[song_name].name = song_name
        })

        this.setState({
            songInfo: combined_song_info,
            totalStreams: spotify_stats.totalStreams + youtube_stats.totalStreams,
            loaded: true
        })
    }

    componentDidMount() {
        this.refresh();

        this.refreshInterval = setInterval(() => {
            this.refresh();
        }, 15000)
    }

    componentWillUnmount() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
        }
    }

    render() {
        return (
            <div className='app'>
                <h3>
                    Jandel's Music Stats
                </h3>
                <p>
                    <b><RollingNumber goal={this.state.totalStreams}/>
                    </b> Total Streams
                </p>

                <div className='spacer'/>

                <div className='game-list'>
                    {
                        this.state.loaded ? null : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    }
                    {
                        Object.values(this.state.songInfo).sort((a, b) => b.streams - a.streams).map((info) => {
                            return <Card info={info} key={info.spotifyId || info.youtubeId}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default App;
