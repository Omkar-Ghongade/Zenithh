import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function MarketPlace() {
  const [showPopup, setShowPopup] = useState(false);
  const [musicName, setMusicName] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [address, setAddress] = useState('');
  const [cost, setCost] = useState('');
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

  const handleSellButtonClick = () => {
    setShowPopup(true);
  };

  const uploadFileToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: '494f632eb68be9dfe0ed',
          pinata_secret_api_key: 'ac3528409ced65193e681a3cae46c0d6783424b6a1e9052c873755e971e01098',
        },
      });
      return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading file: ', error);
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log('Music Name:', musicName);
    console.log('Music File:', musicFile);
    console.log('Address:', address);
    console.log('Cost:', cost);

    try {
      const audioLink = await uploadFileToIPFS(musicFile);
      console.log('Audio Link:', audioLink);

      const res = await fetch('http://localhost:3000/market/addtomarket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: musicName,
          audio: audioLink,
          address,
          cost,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error:', errorData);
      } else {
        console.log('Success:', await res.json());
        setMarket((prevMarket) => [...prevMarket, { name: musicName, audio: audioLink, cost }]);
      }
    } catch (err) {
      console.error('Error:', err);
    }

    setShowPopup(false);
  };

  const handleTimeUpdate = (index) => {
    const audioRef = audioRefs.current[index];
    if (audioRef.currentTime >= 30) {
      audioRef.pause();
      audioRef.currentTime = 0;
    }
  };

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

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold text-center my-4">MarketPlace</h1>
      <button
        className="left-4 top-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleSellButtonClick}
      >
        Sell Your Own Music
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <form onSubmit={handleFormSubmit}>
              <h2 className="text-xl font-bold mb-4">Sell Your Music</h2>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Name of Music:
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    value={musicName}
                    onChange={(e) => setMusicName(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Music File:
                  <input
                    type="file"
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) => setMusicFile(e.target.files[0])}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Your Address:
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Cost:
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="my-8">
        {market.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {market
              .filter((item) => item.address !== userAddress)
              .map((item, index) => (
                <div key={index} className="bg-white p-4 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    controls
                    className="mb-2"
                    onTimeUpdate={() => handleTimeUpdate(index)}
                  >
                    <source src={item.audio} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-gray-700 mb-2">Cost: {item.cost} APTOS</p>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleBuyButtonClick(item)}
                  >
                    Buy
                  </button>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No music available in the marketplace.</p>
        )}
      </div>
    </div>
  );
}
