import React, { useState } from 'react';

export default function SellMusic() {
  const [showPopup, setShowPopup] = useState(false);
  const [musicName, setMusicName] = useState('');
  const [musicFile, setMusicFile] = useState(null);
  const [address, setAddress] = useState('');
  const [cost, setCost] = useState('');

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

    try {
      const audioLink = await uploadFileToIPFS(musicFile);
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
        setShowPopup(false);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold text-center my-4">Sell Your Music</h1>
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
    </div>
  );
}
