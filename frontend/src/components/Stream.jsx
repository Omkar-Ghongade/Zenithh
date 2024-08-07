// src/components/Stream.jsx
import React , {useState} from 'react';
import { NavLink } from 'react-router-dom';

export default function Stream() {
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
      console.log('User:', user);
      const userAddress = user.data.address;
      const collectionName = 'MusicNFTs';
      const description = `NFT for ${name}`;

      await window.fewcha.token.createCollection(collectionName, description, uri);

      // Create Token
      const createTokenResponse = await window.fewcha.token.createToken(
        collectionName,
        name,
        description,
        1,
        uri,
        "10000", // max supply
        userAddress, // Royalty payee address
        10, // Royalty points denominator
        1 // Royalty points numerator
      );

      console.log('Create Token Response:', createTokenResponse);

      if (createTokenResponse.status !== 200) throw new Error('Failed to create token');

      // Offer Token to self
      const offerTokenResponse = await window.fewcha.token.offerToken(
        userAddress, // receiver address (self)
        userAddress, // creator address (self)
        collectionName,
        name,
        1 // amount
      );

      console.log('Offer Token Response:', offerTokenResponse);

      // Claim Token
      const claimTokenResponse = await window.fewcha.token.claimToken(
        userAddress, // sender address (self)
        userAddress, // creator address (self)
        collectionName,
        name
      );

      console.log('Claim Token Response:', claimTokenResponse);

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
      console.log('Audio File Link:', audioLink);
      console.log('Cover Photo Link:', coverLink);
      
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
      <h1 className="text-2xl font-bold mb-4">Stream</h1>
      <nav className="mb-4">
        <NavLink
          to="/stream/music"
          className={({ isActive }) => `mr-4 p-2 ${isActive ? 'text-blue-500' : 'text-white'}`}
        >
          Stream Music
        </NavLink>
        <NavLink
          to="/stream/upload"
          className={({ isActive }) => `p-2 ${isActive ? 'text-blue-500' : 'text-white'}`}
        >
          Upload Music
        </NavLink>
      </nav>
    </div>
  );
}
