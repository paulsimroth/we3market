require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const key = require("./secret.json").secret;
const alchemyKey = require("./secret.json").alchemy;

module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
      accounts: [key]
    }
  }
};
