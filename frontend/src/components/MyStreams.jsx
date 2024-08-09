import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';

export default function MyStreams() {
  const [myNFTs, setMyNFTs] = useState([]);
  const audioRefs = useRef([]);

  useEffect(() => {
    const fetchMyNFTs = async () => {
      try {
        const user = await window.fewcha.account();
        const userAddress = user.data.address;
        const res = await fetch('http://localhost:3000/user/mynfts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: userAddress,
          }),
        });
        const data = await res.json();
        console.log(data);
        setMyNFTs(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchMyNFTs();
  }, []);

  const handleTimeUpdate = (index) => {
    const audioRef = audioRefs.current[index];
    const progress = document.getElementById(`progress-bar-${index}`);
    progress.value = (audioRef.currentTime / audioRef.duration) * 100;
  };

  const handleSeek = (index, e) => {
    const audioRef = audioRefs.current[index];
    const progress = document.getElementById(`progress-bar-${index}`);
    const seekTime = (progress.value / 100) * audioRef.duration;
    audioRef.currentTime = seekTime;
  };

  const handlePlayPause = (index) => {
    const audioRef = audioRefs.current[index];
    if (audioRef.paused) {
      audioRef.play();
      document.getElementById(`play-button-${index}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6" /></svg>`;
    } else {
      audioRef.pause();
      document.getElementById(`play-button-${index}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-4.596 2.65a1 1 0 01-1.505-.865V10.05a1 1 0 011.505-.865l4.596 2.65a1 1 0 010 1.73z" /></svg>`;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full mb-3 mx-auto justify-items-center">
      <Typography variant="h4" className="mb-4 text-white col-span-full text-center">
        My Streams
      </Typography>
      {myNFTs.map((nft, index) => (
        <Card
          key={nft._id}
          className="h-auto w-68 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 p-4"
          style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
        >
          <img src={nft.image} alt={nft.name} className="h-40 w-full object-cover mb-4" />
          <CardBody className="p-0">
            <Typography variant="h5" className="mb-2 text-white">
              {nft.name}
            </Typography>
            <Typography className="text-sm text-gray-400 mt-2 mb-4">
              Address: {nft.address.slice(0, 6)}...{nft.address.slice(-4)}
            </Typography>
            <div className="custom-audio-player mb-4">
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={nft.audio}
                onTimeUpdate={() => handleTimeUpdate(index)}
              ></audio>
              <div className="controls flex items-center justify-between">
                <button
                  id={`play-button-${index}`}
                  className="bg-transparent p-0 m-0 focus:outline-none"
                  onClick={() => handlePlayPause(index)}
                  dangerouslySetInnerHTML={{
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-4.596 2.65a1 1 0 01-1.505-.865V10.05a1 1 0 011.505-.865l4.596 2.65a1 1 0 010 1.73z" /></svg>`,
                  }}
                ></button>
                <input
                  id={`progress-bar-${index}`}
                  type="range"
                  className="progress-bar w-full mx-4"
                  onChange={(e) => handleSeek(index, e)}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    accentColor: '#fff',
                  }}
                />
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
