import React, { useEffect, useState, useRef } from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';

export default function BuyMusic() {
  const [market, setMarket] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const audioRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/market/displaymarket');
        const data = await res.json();
        setMarket(data);
        console.log(data);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    const getUserAddress = async () => {
      try {
        const user = await window.fewcha.account();
        setUserAddress(user.data.address);
      } catch (err) {
        console.error('Error getting user address:', err);
      }
    };

    fetchData();
    getUserAddress();
  }, []);

  const handleBuyButtonClick = async (item) => {
    try {
      const receiverAddress = item.address;
      const amount = item.cost * 100000;

      const payload = {
        type: 'entry_function_payload',
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: [receiverAddress, amount],
      };

      const rawTransaction = await window.fewcha.generateTransaction(payload);
      if (rawTransaction.status !== 200) throw new Error('Failed to generate transaction');

      const txnHash = await window.fewcha.signAndSubmitTransaction(rawTransaction.data);
      if (txnHash.status !== 200) throw new Error('Transaction failed');

      const user = await window.fewcha.account();
      const userAddress = user.data.address;

      try {
        const res = await fetch('http://localhost:3000/market/transferownership', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: item.name,
            Address: receiverAddress,
            nAddress: userAddress,
          }),
        });
        console.log('Success:', await res.json());
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

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

  return (
    <div className="my-8">
      {market.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ml-3 mr-3">
          {market
            .filter((item) => item.address !== userAddress)
            .map((item, index) => (
              <Card
                key={index}
                className="h-auto w-68 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300 p-4"
                style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}
              >
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-40 w-full object-cover mb-4" />
                ) : (
                  <div className="h-40 w-full bg-gray-800 mb-4 flex items-center justify-center text-white">
                    No Image Available
                  </div>
                )}
                <CardBody className="p-0">
                  <Typography variant="h5" className="mb-2 text-white">
                    {item.name}
                  </Typography>
                  <Typography className="text-sm text-gray-400 mt-2 mb-4">
                    Address: {item.address.slice(0, 6)}...{item.address.slice(-4)}
                  </Typography>
                  <Typography className="text-sm text-gray-400 mb-4">
                    Cost: {item.cost} APTOS
                  </Typography>
                  <div className="custom-audio-player mb-4">
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={item.audio}
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
                  <Button
                    className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-900"
                    onClick={() => handleBuyButtonClick(item)}
                  >
                    Buy
                  </Button>
                </CardBody>
              </Card>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No music available in the marketplace.</p>
      )}
    </div>
  );
}
