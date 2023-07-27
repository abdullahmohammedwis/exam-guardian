import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleFontLoader from 'react-google-font-loader';

const fontConfig = {
  fonts: [
    {
      font: 'Nunito',
      weights: [300, 400, 700],
    },
  ],
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <GoogleFontLoader fonts={fontConfig.fonts} />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);
