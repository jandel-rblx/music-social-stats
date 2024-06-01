let Music = {};

Music.PROXY_URL = "https://jandel-backend.onrender.com/" //"https://typical-backend-n0kt.onrender.com/"
Music.SECRET = "jandelmusic" // Not really that "secret", just how the backend works.

Music.total_music_map = {}
Music.spotify_song_map = {}
Music.youtube_song_map = {}

Music.proxyFetch = async function(sub_url, data) {
    let result = await fetch(this.PROXY_URL + sub_url + "?secret=jandelmusic" + data).catch((err) => {
        console.log(err);

        return null;
    })

    if (!result) {
        return null;
    }

    if (result.status !== 200) {
        console.log(result.status, await result.text());

        return null;
    }

    return result;
}

Music.getSongInfo = async function (songs_ids, song_fetch_type) {
    let info = await this.proxyFetch("jandelmusic", `&type=${song_fetch_type}&tracks=${songs_ids.join(",")}`);
    
    if (!info) {
        return false;
    }

    info = await info.json();

    let data = {};
    let total_streams = 0;

    Object.keys(info).forEach((song_id) => {
        const song_name = this[song_fetch_type + "_song_map"][song_id];
        const api_info = info[song_id];

        data[song_name] = {
            streams: api_info.playcount,
            id: api_info.id,
            thumbnail: api_info.thumbnail,
            type: song_fetch_type
        }

        total_streams += api_info.playcount;
    })

    return {
        mainData: data,
        totalStreams: total_streams
    };
}

export default Music