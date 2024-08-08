import React, { useEffect, useState } from 'react';
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver
} from "@anon-aadhaar/react";

const AnonAadhaarVerification = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [latestProof] = useProver();
  const [isAnonAadhaarInLocalStorage, setIsAnonAadhaarInLocalStorage] = useState(false);

  useEffect(() => {
    const aadhaar = localStorage.getItem('anonAadhaar');
    if (aadhaar) {
      setIsAnonAadhaarInLocalStorage(true);
    }
  }, []);

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
    if (anonAadhaar.status === "logged-in") {
      console.log("Anon Aadhaar proof: ", latestProof);
    }
  }, [anonAadhaar, latestProof]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {!isAnonAadhaarInLocalStorage && (
        <LogInWithAnonAadhaar nullifierSeed={1234} fieldsToReveal={["revealAgeAbove18"]} />
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