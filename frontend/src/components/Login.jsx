// Login and Verifying Page
import React from 'react'

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
        <div>
        <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={connectWallet}
        >
            Connect
        </button>
        </div>
    )
}
