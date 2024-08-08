import React, { useEffect, useState } from 'react';
import AnonAadhaarVerification from './AnonAadhaarVerification';
import { Card, CardBody, Typography } from '@material-tailwind/react';

const Profile = () => {
  const [myNFTs, setMyNFTs] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const aadhaar = localStorage.getItem('anonAadhaar');
      if (aadhaar) {
        setIsVerified(true);
      }
    };

    checkVerificationStatus();
  }, []);

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

    if (isVerified) {
      fetchMyNFTs();
    }
  }, [isVerified]); // Fetch NFTs only after verification

  return (
    <div className="flex flex-col justify-center items-center w-full mb-9 px-4">
      {!isVerified && (
        <div className="bg-[#303030] bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg max-w-6xl mt-4">
          <div className="rounded-lg flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 w-full flex flex-col justify-center space-y-6 p-6 md:p-9">
              <h1 className="text-3xl font-bold text-white text-center md:text-left">
                Anon Aadhaar uses zero-knowledge circuits to verify this signature and generate proof of it.
              </h1>
              <p className="text-[#B0B0B0] text-center md:text-left">
                Verifier confirms Aadhaar's validity and revealed age, state, gender.
              </p>
              <AnonAadhaarVerification onVerified={() => setIsVerified(true)} />
              <p className="text-gray-600 text-sm text-center md:text-left">
                By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">cookie use</a>.
              </p>
            </div>
            <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center items-center">
              <img src="src/assets/Annon.png" alt="Signup Illustration" className="shadow-lg rounded-r-lg h-64 md:h-96" />
            </div>
          </div>
        </div>
      )}

      {isVerified && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
          {myNFTs.map((nft) => (
            <Card key={nft._id} className="h-96 w-68 bg-neutral-950 hover:drop-shadow-2xl hover:shadow-purple-300"
            style={{ background: 'radial-gradient(190% 160% at 30% 10%, #000 40%, #63e 100%)' }}>
              <img src={nft.image} alt={nft.name} className="h-48 w-full object-cover" />
              <CardBody>
                <Typography variant="h5" className="mb-2 text-white">
                  {nft.name}
                </Typography>
                <Typography className="text-sm text-gray-400 mt-2">
                  Address: {nft.address}
                </Typography>
                <audio controls className="mt-4 w-full">
                  <source src={nft.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default Profile;
