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
      expect(await web3market.owner()).to.equal(deployer.address)
    })

  })

  describe("Listing", () => {
    let tx

    const ID = 1
    const NAME = "Shoes"
    const CATEGORY = "Clothing"
    const IMAGE = "IMAGE LINK"
    const PRICE = 3
    const RATING = 4
    const STOCK = 5

    beforeEach(async () => {
      tx = await web3market.connect(deployer).list(
        ID, NAME, CATEGORY, IMAGE, PRICE, RATING, STOCK
      )

      await tx.wait()
      
    })

    it("Returns item attributes", async () => {
      const item = await web3market.items(1)
      expect(item.id).to.equal(ID)
    })

  })
});