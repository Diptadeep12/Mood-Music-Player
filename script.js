document.getElementById('search-btn').addEventListener('click', searchPlaylist);

function searchPlaylist() {
    const mood = document.getElementById('mood').value;
    const playlistId = getPlaylistIdForMood(mood);
    if (playlistId) {
        getPlaylistTracks(playlistId);
    } else {
        alert('No playlist found for this mood. Please try another mood.');
    }
}

function getPlaylistIdForMood(mood) {
    // Map moods to Spotify playlist IDs
    const moodPlaylists = {
        'happy': '5ddkKNwM9JoG6XPPMb77wR',
        'sad': '3EvCZ7co4ALii4QAysjMVw',
        'calm': '0FM788TAWd3hxi1R4Sd3V1',
        'energetic': '2oHVoMs96dgaYrJgcmxrEy'
    };
    return moodPlaylists[mood];
}

function getPlaylistTracks(playlistId) {
    const apiUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer 25868c2d7dfd433ea10dcdbdb9fc0c98'
        }
    })
    .then(response => response.json())
    .then(data => {
        const tracks = data.items;
        if (tracks.length > 0) {
            const randomIndex = Math.floor(Math.random() * tracks.length);
            const selectedTrack = tracks[randomIndex].track;
            displaySong(selectedTrack);
        } else {
            alert('No songs found in this playlist.');
        }
    })
    .catch(error => console.log('Error fetching data:', error));
}

function displaySong(track) {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = `
        <h2>${track.name}</h2>
        <p>Artist: ${track.artists[0].name}</p>
        <img src="${track.album.images[0].url}" alt="${track.name} album cover" width="200">
    `;
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = track.preview_url;
    audioPlayer.play();
}
