// src/components/UploadMusic.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function UploadMusic() {
  const [audioFile, setAudioFile] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [songName, setSongName] = useState('');
  const [audioFileLink, setAudioFileLink] = useState('');
  const [coverPhotoLink, setCoverPhotoLink] = useState('');

  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleSongNameChange = (e) => {
    setSongName(e.target.value);
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

  const mintNFT = async (uri, name) => {
    try {
      const user = await window.fewcha.account();
      const userAddress = user.data.address;
      const collectionName = 'MusicNFTs';
      const description = `NFT for ${name}`;

      await window.fewcha.token.createCollection(collectionName, description, uri);

      const createTokenResponse = await window.fewcha.token.createToken(
        collectionName,
        name,
        description,
        1,
        uri,
        "10000",
        userAddress,
        10,
        1
      );

      if (createTokenResponse.status !== 200) throw new Error('Failed to create token');

      const offerTokenResponse = await window.fewcha.token.offerToken(
        userAddress,
        userAddress,
        collectionName,
        name,
        1
      );

      const claimTokenResponse = await window.fewcha.token.claimToken(
        userAddress,
        userAddress,
        collectionName,
        name
      );

      if (claimTokenResponse.status !== 200) throw new Error('Failed to claim token');

      console.log('NFT Minted Successfully');
      return userAddress;
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const audioLink = await uploadFileToIPFS(audioFile);
      const coverLink = await uploadFileToIPFS(coverPhoto);
      setAudioFileLink(audioLink);
      setCoverPhotoLink(coverLink);

      const userAddress = await mintNFT(coverLink, songName);
      try{
        const res = await fetch('http://localhost:3000/user/nfts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: userAddress,
            image: coverLink,
            audio: audioLink,
            name: songName,
          }),
        });
      }catch(err){
        console.log(err);
      }
    } catch (error) {
      console.error('Error uploading files and minting NFT:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Music</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Song Name
          </label>
          <input
            type="text"
            value={songName}
            onChange={handleSongNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter song name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Cover Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Audio File
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
      {audioFileLink && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Uploaded Audio File:</h2>
          <a href={audioFileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {audioFileLink}
          </a>
        </div>
      )}
      {coverPhotoLink && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">Uploaded Cover Photo:</h2>
          <a href={coverPhotoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
            {coverPhotoLink}
          </a>
        </div>
      )}
    </div>
  );
}
