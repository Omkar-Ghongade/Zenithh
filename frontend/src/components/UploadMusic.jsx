import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Typography } from '@material-tailwind/react';

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
          pinata_api_key: 'your_pinata_api_key',
          pinata_secret_api_key: 'your_pinata_secret_api_key',
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

      await mintNFT(coverLink, songName);
    } catch (error) {
      console.error('Error uploading files and minting NFT:', error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 mx-auto">
      <Card className="w-full max-w-lg p-6 rounded-xl shadow-lg hover:shadow-2xl" style={{ background: 'radial-gradient(circle, rgba(48,48,48,1) 0%, rgba(24,24,24,1) 100%)' }}>
        <CardBody>
          <Typography variant="h3" className="mb-6 text-center text-white">
            Upload Your Music
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Song Name
              </label>
              <input
                type="text"
                value={songName}
                onChange={handleSongNameChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter song name"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Cover Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverPhotoChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Audio File
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500"
              />
            </div>
            <Button type="submit" color="purple" className="w-full bg-purple-700 hover:bg-purple-950">
              Submit
            </Button>
          </form>
          {audioFileLink && (
            <div className="mt-4 text-center">
              <Typography variant="h6" className="font-bold text-white">Uploaded Audio File:</Typography>
              <a href={audioFileLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {audioFileLink}
              </a>
            </div>
          )}
          {coverPhotoLink && (
            <div className="mt-4 text-center">
              <Typography variant="h6" className="font-bold text-white">Uploaded Cover Photo:</Typography>
              <a href={coverPhotoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {coverPhotoLink}
              </a>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
