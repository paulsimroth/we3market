const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Web3Market", () => {

  let web3market;
  let deployer, buyer;

  beforeEach(async () => {
    //Setup Accounts
    [deployer, buyer] = await ethers.getSigners();
    console.log("Deployer:", deployer.address, "||", "Buyer:", buyer.address);
    
    //Deploy Contracts
    const Web3Market = await ethers.getContractFactory("Web3Market")
    web3market = await Web3Market.deploy()
  })

  describe("Deployment", () => {

    it("Sets owner", async () => {
      expect(await web3market.owner().to.equal(deployer.address))
    })

    it("has a name", async () => {
      const name = await web3market.name()
      expect(name).to.equal("Web3Market")
    }) 
  })
});