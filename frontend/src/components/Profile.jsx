import React from 'react';
import AnonAadhaarVerification from './AnonAadhaarVerification';

const Profile = () => {
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
            <AnonAadhaarVerification/>
            <p className="text-gray-600 text-sm text-center md:text-left">
              By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">cookie use</a>.
            </p>
          </div>
          <div className="md:w-1/2 w-full mt-6 md:mt-0 flex justify-center items-center">
            <img src="src/assets/Annon.png" alt="Signup Illustration" className="shadow-lg rounded-r-lg h-64 md:h-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
