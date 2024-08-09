import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import { FaPlay, FaPause } from 'react-icons/fa';

export default function StreamMusic() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);
  const [currentTime, setCurrentTime] = useState([]);
  const [duration, setDuration] = useState([]);

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
    if (currentSongIndex !== null) {
      const handleLoadedMetadata = () => {
        const newDuration = [...duration];
        newDuration[currentSongIndex] = audioRefs.current[currentSongIndex].duration;
        setDuration(newDuration);
      };

      const handleTimeUpdate = () => {
        const newCurrentTime = [...currentTime];
        newCurrentTime[currentSongIndex] = audioRefs.current[currentSongIndex].currentTime;
        setCurrentTime(newCurrentTime);
        updateProgress(currentSongIndex);
      };

      const audioRef = audioRefs.current[currentSongIndex];
      if (audioRef) {
        audioRef.addEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
          audioRef.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.removeEventListener('timeupdate', handleTimeUpdate);
        };
      }
    }
  }, [currentSongIndex]);

  const playSong = async (index) => {
    if (index !== null && index < songs.length && index >= 0) {
      audioRefs.current[index].src = songs[index].audio;
      try {
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
      } catch (err) {
        console.log(err);
      }
      audioRefs.current[index].play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = async (index) => {
    if (currentSongIndex === index && isPlaying) {
      audioRefs.current[index].pause();
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

  const updateProgress = (index) => {
    if (audioRefs.current[index] && audioRefs.current[index].duration) {
      const progressBar = document.getElementById(`progress-bar-${index}`);
      progressBar.value = (audioRefs.current[index].currentTime / audioRefs.current[index].duration) * 100;
    }
  };

  const handleProgressChange = (index, event) => {
    const seekTime = (event.target.value / 100) * audioRefs.current[index].duration;
    audioRefs.current[index].currentTime = seekTime;
    const newCurrentTime = [...currentTime];
    newCurrentTime[index] = seekTime;
    setCurrentTime(newCurrentTime);
  };

  return (
    <div className="container my-8 justify-items-center">
      <Typography variant="h3" className="text-center mb-8 text-white ">
        Stream Music
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-3 mr-3">
        {songs.map((song, index) => (
          <Card
            key={song.id}
            className="h-auto w-68 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 p-4"
            style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
          >
            <img src={song.image} alt={song.name} className="h-40 w-full object-cover mb-4" />
            <CardBody className="p-0">
              <Typography variant="h5" className="mb-2 text-white">
                {song.name}
              </Typography>
              <Typography className="text-sm text-gray-400 mt-2 mb-4">
                Artist: {song.artist}
              </Typography>
              <div className="custom-audio-player mb-4">
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                  onTimeUpdate={() => handleTimeUpdate(index)}
                ></audio>
                <div className="controls flex items-center justify-between">
                  <button
                    id={`play-button-${index}`}
                    className="bg-transparent p-0 m-0 focus:outline-none"
                    onClick={() => handlePlayPause(index)}
                  >
                    {currentSongIndex === index && isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <input
                    id={`progress-bar-${index}`}
                    type="range"
                    className="progress-bar w-full mx-4"
                    onChange={(e) => handleProgressChange(index, e)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      accentColor: '#fff',
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-white flex justify-between">
                <span>{Math.floor((currentTime[index] || 0) / 60)}:{Math.floor((currentTime[index] || 0) % 60).toString().padStart(2, '0')}</span>
                <span>{Math.floor((duration[index] || 0) / 60)}:{Math.floor((duration[index] || 0) % 60).toString().padStart(2, '0')}</span>
              </div>
              <Button
                className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900 mt-4"
                onClick={() => handlePlayPause(index)}
              >
                {currentSongIndex === index && isPlaying ? 'Pause' : 'Play'}
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
