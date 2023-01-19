import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Section from './components/Section';
import Product from './components/Product';

// ABIs
import Web3Market from './abis/Web3Market.json';

// Config
import config from './config.json';

function App() {

  const loadChainData = async () => {
    console.log("Loading...");
  }

  return (
    <div>

      <h2>Welcome to Web3 Market</h2>

    </div>
  );
}

export default App;
