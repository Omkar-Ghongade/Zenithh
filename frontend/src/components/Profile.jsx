import React, { useEffect, useState } from 'react';
import AnonAadhaarVerification from './AnonAadhaarVerification';

const Profile = () => {

  const [myNFTs, setMyNFTs] = useState([]);

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
        }); // Ensure the endpoint is correct
        const data = await res.json();
        console.log(data);
        setMyNFTs(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      }
    };

    fetchMyNFTs();
  }, []); // Add dependencies if necessary

  return (
    <div className="flex flex-col justify-center items-center w-full mb-9 px-4">
      <div className="bg-[#303030] bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg max-w-6xl mt-4">
        <div className="rounded-lg flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full flex flex-col justify-center space-y-6 p-6 md:p-9">
            <h1 className="text-3xl font-bold text-white text-center md:text-left">
              Anon Aadhaar uses zero-knowledge circuits to verify this signature and generate proof of it.
            </h1>
            <p className="text-[#B0B0B0] text-center md:text-left">
              Verifier confirms Aadhaar's validity and revealed age, state, gender.
            </p>
            <AnonAadhaarVerification />
            <p className="text-gray-600 text-sm text-center md:text-left">
              By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">cookie use</a>.
            </p>
          </div>
          <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center items-center">
            <img src="/assets/Annon.png" alt="Signup Illustration" className="shadow-lg rounded-r-lg h-64 md:h-96" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
        {myNFTs.map((nft) => (
          <div key={nft._id} className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md flex flex-col items-center">
            <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover rounded-lg" />
            <h2 className="text-xl font-semibold text-white mt-4">{nft.name}</h2>
            <p className="text-sm text-gray-400 mt-2">Address: {nft.address}</p>
            <audio controls className="mt-4 w-full">
              <source src={nft.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
