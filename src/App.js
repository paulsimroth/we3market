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
  //useState
  const [account, setAccount] = useState(null);

  //Loading items from blockchain
  const loadChainData = async () => {
    const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  //use Effect calls loading of items
  useEffect(() => {
    loadChainData()
  }, []);

  //Main page
  return (
    <div>
      <Navigation account={account} setAccount={setAccount}/>
      <h2>Welcome to Web3 Market</h2>

    </div>
  );
}

export default App;
