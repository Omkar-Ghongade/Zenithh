import React, { useEffect, useState, useRef } from 'react';

export default function StreamMusic() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const progressBarRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch the list of songs from the server
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch('http://localhost:3000/songs/allsongs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  // Update the audio player with the current song and handle events
  useEffect(() => {
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
      updateProgress();
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleNext);

      return () => {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleNext);
      };
    }
  }, [currentSongIndex]);

  // Play the selected song
  const playSong = (index) => {
    if (index !== null && index < songs.length && index >= 0) {
      audioRef.current.src = songs[index].audio; // Use the audio link from the song object
      audioRef.current.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  // Toggle play/pause for the selected song
  const handlePlayPause = (index) => {
    if (currentSongIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      playSong(index);
    }
  };

  // Play the next song in the list
  const handleNext = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    }
  };

  // Play the previous song in the list
  const handlePrevious = () => {
    if (currentSongIndex !== null && currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    }
  };

  // Update the progress bar based on the current time of the audio
  const updateProgress = () => {
    if (audioRef.current && progressBarRef.current) {
      progressBarRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }
  };

  // Handle changes to the progress bar (seek functionality)
  const handleProgressChange = (event) => {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Stream Music</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song, index) => (
          <div key={song.id} className="p-4 border rounded shadow">
            <img src={song.image} alt={song.name} className="w-full h-40 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{song.name}</h2>
            <button
              onClick={() => handlePlayPause(index)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              {currentSongIndex === index && isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        ))}
      </div>
      {currentSongIndex !== null && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Previous
          </button>
          <div className="flex flex-col items-center">
            <img src={songs[currentSongIndex].image} alt={songs[currentSongIndex].title} className="w-20 h-20 object-cover mb-2" />
            <h2 className="text-lg">{songs[currentSongIndex].title}</h2>
            <input
              ref={progressBarRef}
              type="range"
              min="0"
              max="100"
              step="1"
              value={(currentTime / duration) * 100}
              onChange={handleProgressChange}
              className="w-full mt-2"
            />
            <div className="flex justify-between w-full text-xs mt-1">
              <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
