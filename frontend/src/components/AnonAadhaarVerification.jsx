// src/components/AnonAadhaarVerification.jsx
import React, { useEffect, useState } from 'react';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver
} from "@anon-aadhaar/react";

const AnonAadhaarVerification = ({ onVerified }) => {
  const anonAadhaar = useAnonAadhaar();
  const latestProof = useProver();
  const [isAnonAadhaarInLocalStorage, setIsAnonAadhaarInLocalStorage] = useState(false);

  useEffect(() => {
    const aadhaar = localStorage.getItem('anonAadhaar');
    if (aadhaar) {
      setIsAnonAadhaarInLocalStorage(true);
      onVerified(); // Call onVerified if already logged in
    }
  }, [onVerified]);

  useEffect(() => {
    if (anonAadhaar) {
      console.log("Anon Aadhaar status: ", anonAadhaar.status);
      if (anonAadhaar.status === "logged-in") {
        console.log("Anon Aadhaar proof: ", latestProof);
        onVerified();
      }
    } else {
      console.log("Anon Aadhaar is undefined");
    }
  }, [anonAadhaar, latestProof, onVerified]);

  return (
    <div className="flex flex-col items-center justify-center text-black">
      {!isAnonAadhaarInLocalStorage && (
        <LogInWithAnonAadhaar 
          nullifierSeed={1234} 
          fieldsToReveal={["revealAgeAbove18"]} 
          onError={(error) => console.error("Error during AnonAadhaar login:", error)}
        />
      )}
      <p>{anonAadhaar?.status}</p>
      {anonAadhaar?.status === "logged-in" && (
        <>
          {latestProof && (
            <pre className="text-left whitespace-pre-wrap">
              {JSON.stringify(latestProof, null, 2)}
            </pre>
          )}
        </>
      )}
    </div>
  );
};

export default AnonAadhaarVerification;
