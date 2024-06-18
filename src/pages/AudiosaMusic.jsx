import React, { useEffect, useState } from 'react'
import '../css/music-dashboard.css'
import '../css/style.css'
import { Tilt } from 'react-tilt'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const MusicDashboard = () => {
  const [token, setToken] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audioPlayer, setAudioPlayer] = useState(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Track duration
  const [genres, setGenres] = useState([]);

  const random_number = Math.floor(Math.random() * 30) + 1;

  useEffect(() => {
    // Update the current playback time continuously
    const updateCurrentTime = () => {
      setCurrentTime(audioPlayer.currentTime);
    };

    // Update the duration when a new track is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
      setDuration(audioPlayer.duration);
    });

    // Add an event listener for the 'timeupdate' event
    audioPlayer.addEventListener('timeupdate', updateCurrentTime);

    // Remove the event listener when the component unmounts
    return () => {
      audioPlayer.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  // Calculate the percentage of track completion
  const trackProgress = (currentTime / duration) * 100;

  // Helper function to format time in minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    // Replace with your Spotify API credentials
    const clientId = '4cc8a0203d75418c889e0afabd81fb0b';
    const redirectUri = 'https://audiosa-swart.vercel.app/audiosaplayer'; // Your redirect URI
    const scopes = ['user-library-read', 'playlist-read-private'];

    // Check if the URL contains the access token
    const hashParams = window.location.hash
      .substring(1)
      .split('&')
      .reduce((acc, param) => {
        const [key, value] = param.split('=');
        acc[key] = value;
        return acc;
      }, {});

    if (hashParams.access_token) {
      setToken(hashParams.access_token);
    } else {
      // Redirect the user to Spotify login to get an access token
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
      window.location.href = authUrl;
    }
  }, []);

  useEffect(() => {
    if (token) {
      // Fetch the user's top artists using the Spotify API
      fetch('https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // setTopArtists(data.items);
          console.log(data.items)
        })
        .catch((error) => console.error('Error fetching top artists:', error));
    }
  }, [token]);



  useEffect(() => {
    if (token) {
      // Fetch user's playlists using the Spotify API
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPlaylists(data.items);
        })
        .catch((error) => console.error('Error fetching playlists:', error));

      // Fetch the list of available genres from Spotify
      fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setGenres(data.genres);
        })
        .catch((error) => console.error('Error fetching genres:', error));
    }
  }, [token]);

  useEffect(() => {
    if (selectedPlaylist) {
      // Fetch tracks from the selected playlist
      fetch(selectedPlaylist.tracks.href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.items);
        })
        .catch((error) => console.error('Error fetching tracks:', error));
    }
  }, [selectedPlaylist, token]);

  const playSong = (track) => {
    // Pause the currently playing track (if any)
    if (currentTrack) {
      audioPlayer.pause();
    }
    // Check if the track and its preview_url exist before playing
    if (track && track.track && track.track.preview_url) {
      audioPlayer.src = track.preview_url;
      audioPlayer.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    } else {
      console.error('Preview URL not available for this track.');
    }
    // Set the new track to play
    audioPlayer.src = track.track.preview_url;
    audioPlayer.play();
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    audioPlayer.pause();
    setIsPlaying(false);
  };

  const searchMusic = () => {
    if (searchQuery) {
      fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.tracks.items);
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
  };
  return (
    <div class="grid grid-rows-3 justify-items-end grid-cols-6 h-full">
      <Navbar />
      <Header />
      <main class="relative col-span-5 row-span-3 overflow-auto pb-40">
        
        <div className='px-20 '>
          <div class="relative pt-32">
            <div class="absolute inset-y-0 left-0 pt-32 flex items-center pl-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a track" />
            <button onClick={searchMusic}
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
          </div>
        </div>
        <div class="p-6 flex items-center">
          <button
            class="h-8 w-8 bg-gray-500 rounded-full text-white flex mr-4 opacity-50 cursor-not-allowed"
          >
            <svg class="h-5 w-5 m-auto" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M15.54 21.15L5.095 12.23 15.54 3.31l.65.76-9.555 8.16 9.555 8.16"
              ></path>
            </svg>
          </button>
          <button class="h-8 w-8 bg-gray-500 rounded-full text-white flex">
            <svg class="h-5 w-5 m-auto" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7.96 21.15l-.65-.76 9.555-8.16L7.31 4.07l.65-.76 10.445 8.92"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 grid grid-cols-6 gap-4">
          {searchResults.map((track) => (
            <div className="hover:scale-110 ease-in duration-200 bg-gray-200 rounded-lg p-5" key={track.id}>
              <div className="relative pt-full mb-4">
                <img
                  className="block w-full absolute inset-0"
                  src={track.album.images[0].url}
                  alt={track.album.name}
                />
              </div>
              <div className="text-sm text-black text-line-clamp-1 mb-1 block">
                {track.album.name}
              </div>
              <div className="relative pb-5">
                <span className="text-xs text-gray-100 text-line-clamp-1">
                  {track.album.artists[0].name}
                </span>
                <button
                  onClick={() => playSong(track)}
                  className="absolute right-0 top-0 w-10 h-10 bg-green-300 hover:bg-green-500 rounded-full flex text-black">
                  <img className="fill-current h-5 w-5 m-auto" src="https://cdn-icons-png.flaticon.com/512/727/727218.png" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-5xl mx-auto mt-5" data-aos="zoom-y-out">
        <h3 className="text-2xl p-3 font-bold text-black">Free Playlists</h3>
          <div className="relative flex items-start border-2 border-gray-200 shadow-xl rounded bg-white">
            <div class="p-6  grid grid-cols-4 h-60 overflow-y-scroll no-scrollbar gap-4">
              {playlists.map((playlist) => (
                <div key={playlist.id} class="bg-gradient-to-r from-blue-300 to-teal-300 border-2 border-gray-200 shadow-lg rounded-lg p-5">
                  <div onClick={() => setSelectedPlaylist(playlist)} style={{ cursor: 'pointer' }} class="text-sm text-black font-bold text-line-clamp-1 mb-1 block">
                    {playlist.name}
                  </div>
                  <div class="relative pb-5">
                    <span class="text-xs text-gray-100 text-line-clamp-1">@Playlist</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="p-6 grid gap-6 mb-8">
          {selectedPlaylist && (
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-2xl text-black">
                  {selectedPlaylist.name}
                </h3>
              </div>
            </div>
          )}

          <div className="grid grid-cols-6 gap-4">
            {tracks.map((track) => (
              <Tilt className="Tilt" options={{ max: 25 }}>
                <div className="bg-gradient-to-r from-blue-200 to-teal-200 shadow-xl border border-teal-300 ease-in-out duration-500 group-hover:rotate-6 group-hover:scale-125 rounded-lg p-5" key={track.track.id}>
                  <div className="relative pt-full mb-4">
                    <img
                      className="block w-full absolute inset-0"
                      src={track.track.album.images[0].url}
                      alt={track.track.album.name}
                    />
                  </div>
                  <div className="text-sm text-black text-line-clamp-1 mb-1 block">
                    {track.track.album.name}
                  </div>
                  <div className="relative pb-5">
                    <span className="text-xs text-gray-100 text-line-clamp-1">
                      {track.track.album.artists[0].name}
                    </span>
                    <button
                      onClick={() => playSong(track)}
                      className="absolute right-0 top-0 w-10 h-10 bg-blue-300 hover:bg-teal-500 rounded-full flex text-black">
                      <img className="fill-current h-5 w-5 m-auto" src="https://cdn-icons-png.flaticon.com/512/727/727218.png" />
                    </button>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </section>
      </main>
      {currentTrack && (
        <footer class="w-full bg-gray-200 col-span-6 p-4 grid grid-cols-3 gap-6 fixed bottom-0">

          <div class="flex items-center">
            <img
              class="h-14 w-14 mr-4 flex-shrink-0"
              src={currentTrack.track.album.images[0].url}
              alt={currentTrack.track.name}
            />
            <div class="mr-4">
              <div class="text-sm text-black text-line-clamp-1 font-light">
                {currentTrack.track.name}
              </div>
              <div class="text-xs text-gray-100 text-line-clamp-1">
                <span>Ludwig van Beethoven</span>
              </div>
            </div>
            <div class="flex items-center">
              <button class="text-green-200 p-2">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z"
                  />
                </svg>
              </button>
              <button class="text-gray-100 p-2">
                <svg
                  class="w-4 h-4"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="currentColor" fill-rule="evenodd">
                    <path
                      d="M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
                      fill-rule="nonzero"
                    ></path>
                    <path d="M10 8h4v3h-4z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-center mb-3">
              <button class="w-5 h-5 text-gray-100 mr-6">
                <svg
                  class="fill-current w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M6.59 12.83L4.4 15c-.58.58-1.59 1-2.4 1H0v-2h2c.29 0 .8-.2 1-.41l2.17-2.18 1.42 1.42zM16 4V1l4 4-4 4V6h-2c-.29 0-.8.2-1 .41l-2.17 2.18L9.4 7.17 11.6 5c.58-.58 1.59-1 2.41-1h2zm0 10v-3l4 4-4 4v-3h-2c-.82 0-1.83-.42-2.41-1l-8.6-8.59C2.8 6.21 2.3 6 2 6H0V4h2c.82 0 1.83.42 2.41 1l8.6 8.59c.2.2.7.41.99.41h2z"
                  />
                </svg>
              </button>
              <button class="w-5 h-5 text-gray-100 mr-6">
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
                </svg>
              </button>
              {isPlaying ? (
                <button
                  onClick={pauseSong}
                  class="w-8 h-8 border border-gray-300 rounded-full flex text-gray-100 mr-6"
                >
                  <svg
                    class="fill-current h-5 w-5 m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => playSong(currentTrack)}
                  class="w-8 h-8 border border-gray-300 rounded-full flex text-gray-100 mr-6"
                >
                  <svg class="fill-current h-5 w-5 m-auto"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M405.2,232.9L126.8,67.2c-3.4-2-6.9-3.2-10.9-3.2c-10.9,0-19.8,9-19.8,20H96v344h0.1c0,11,8.9,20,19.8,20  c4.1,0,7.5-1.4,11.2-3.4l278.1-165.5c6.6-5.5,10.8-13.8,10.8-23.1C416,246.7,411.8,238.5,405.2,232.9z" />
                  </svg>
                </button>
              )}
              <button class="w-5 h-5 text-gray-100 mr-6">
                <svg
                  class="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
                </svg>
              </button>
              <button class="w-5 h-5 text-gray-100">
                <svg
                  class="fill-current w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4 4-4v8zm0-12V0l4 4-4 4z"
                  />
                </svg>
              </button>
            </div>
            <div>
              <div className="flex justify-center" style={{ alignItems: 'center' }}>
                <p className="mr-1">{formatTime(currentTime)}</p>
                <div className="bg-gray-300" style={{ width: '200px', height: '4px' }}>
                  <div
                    style={{
                      width: `${trackProgress}%`,
                      height: '100%',
                      background: 'black',
                    }}
                  ></div>
                </div>
                <p className='ml-1'>{formatTime(duration)}</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default MusicDashboard
