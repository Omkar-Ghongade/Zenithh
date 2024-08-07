// src/components/Login.jsx
import React from 'react';

export default function Login() {

    const connectWallet = async () => {
        try {
          await window.fewcha.connect();
          window.location.reload();
        } catch (error) {
          console.error('Error connecting or fetching balance:', error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mb-9">
            <div className="bg-[#303030] bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg max-w-6xl w-full mt-4">
                <div className="rounded-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 flex flex-col justify-center space-y-6 mr-3 p-9">
                        <h1 className="text-4xl font-bold text-white">Embark on a musical journey with endless possibilities.</h1>
                        <p className="text-[#B0B0B0]">Unlock exclusive features and rewards by connecting your wallet today.</p>
                        
                        <button 
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={connectWallet}
                        >
                            Connect
                        </button>

                        <p className="text-gray-600 text-sm">By signing up, you agree to the <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>, including <a href="#" className="text-blue-500">cookie use</a>.</p>
                    </div>
                    <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center items-center">
                        <img src="./src/assets/musicsignupbackground.jpg" alt="Signup Illustration" className="shadow-lg rounded-r-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}
