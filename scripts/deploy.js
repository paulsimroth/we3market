// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hardhat = require("hardhat");
const { items } = require("../src/items.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
  //Accounts
  const [deployer] = await ethers.getSigners();

  //Deploy Web3Market
  const Web3M = await hardhat.ethers.getContractFactory("Web3Market");
  const web3m = await Web3M.deploy();
  await web3m.deployed();

  //After deployment log contract address
  console.log(`Deployed the Web3 Market contract at: ${web3m.address}\n`);

  //List items for shop
  for (let i = 0; i < items.length; i++) {
    const tx = await web3m.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await tx.wait()

    //After listing log items to console
    console.log(`Item listed ${items[i].id}: ${items[i].name}\n`);
  }

};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
