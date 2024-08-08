import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function StreamMusic() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const progressBarRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

      return () => {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [currentSongIndex]);

  const playSong = async (index) => {
    if (index !== null && index < songs.length && index >= 0) {
      audioRef.current.src = songs[index].audio;
      try{
        const response = await fetch('http://localhost:3000/user/incstreams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: songs[index].name,
          }),
        });
        const data = await response.json();
        console.log(data);
      }catch(err){
        console.log(err);
      }
      
      audioRef.current.play();
      
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = async (index) => {
    if (currentSongIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        const receiverAddress = '0x1a1a4ced2b2c61be8af8c6e7e8936eb7b2034e05c165434ed6d0c2aa565c11b2';
        const amount = 100000;

        const payload = {
          type: "entry_function_payload",
          function: "0x1::coin::transfer",
          type_arguments: ["0x1::aptos_coin::AptosCoin"],
          arguments: [receiverAddress, amount],
        };

        const rawTransaction = await window.fewcha.generateTransaction(payload);
        if (rawTransaction.status !== 200) throw new Error('Failed to generate transaction');

        const txnHash = await window.fewcha.signAndSubmitTransaction(rawTransaction.data);
        if (txnHash.status !== 200) throw new Error('Transaction failed');

        

        playSong(index);
      } catch (error) {
        console.error('Payment failed:', error);
      }
    }
  };

  const updateProgress = () => {
    if (audioRef.current && progressBarRef.current) {
      progressBarRef.current.value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    }
  };

  const handleProgressChange = (event) => {
    const seekTime = (event.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h3" className="text-center mb-8 text-white">
        Stream Music
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song, index) => (
          <div key={song.id} className="bg-neutral-950 p-4 rounded-lg shadow-lg" style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}>
            <img src={song.image} alt={song.name} className="h-48 w-full object-cover rounded-t-lg" />
            <div className="p-4">
              <Typography variant="h5" className="text-white mb-2">
                {song.name}
              </Typography>
              <Button
                color="blue"
                variant="filled"
                className="w-full bg-purple-700 hover:bg-purple-950"
                onClick={() => handlePlayPause(index)}
              >
                {currentSongIndex === index && isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>
          </div>
        ))}
      </div>
      {currentSongIndex !== null && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between shadow-lg">
          <div className="flex items-center">
            <img src={songs[currentSongIndex].image} alt={songs[currentSongIndex].title} className="w-16 h-16 object-cover mr-4" />
            <div>
              <Typography variant="h6" className="text-white">{songs[currentSongIndex].title}</Typography>
              <Typography variant="body2" className="text-gray-400">{songs[currentSongIndex].artist}</Typography>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => handlePlayPause(currentSongIndex)} color="blue" variant="filled" className="bg-purple-700 hover:bg-purple-950 p-3 rounded-full">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </Button>
          </div>
          <div className="flex flex-col items-center flex-grow mx-4">
            <input
              ref={progressBarRef}
              type="range"
              min="0"
              max="100"
              step="1"
              value={(currentTime / duration) * 100}
              onChange={handleProgressChange}
              className="w-full mt-2 appearance-none bg-gray-800 h-1 rounded-lg"
            />
            <div className="flex justify-between w-full text-xs mt-1 text-white">
              <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
