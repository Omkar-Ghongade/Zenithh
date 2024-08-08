// main.jsx or index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from "@material-tailwind/react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";  

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AnonAadhaarProvider _useTestAadhaar={true}>
        <App />
      </AnonAadhaarProvider>
    </ThemeProvider>
  </StrictMode>
);
