const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};


let web3market;
let deployer, buyer;
let tx;
const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE = "IMAGE LINK";
const PRICE = tokens(2);
const RATING = 4;
const STOCK = 5;

describe("Web3Market", () => {

  beforeEach(async () => {
    //Setup Accounts
    [deployer, buyer] = await ethers.getSigners();
    
    //Deploy Contracts
    const Web3Market = await ethers.getContractFactory("Web3Market")
    web3market = await Web3Market.deploy()
  });

  describe("Deployment", () => {

    it("Sets owner", async () => {
      expect(await web3market.owner()).to.equal(deployer.address)
    });

  });

  describe("Listing", () => {

    beforeEach(async () => {
      //List an item
      tx = await web3market.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, PRICE, RATING, STOCK);
      await tx.wait();
    });

    it("Returns item attributes", async () => {
      const item = await web3market.items(1);
      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.price).to.equal(PRICE);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it("Emits LIST Event", async () => {
      expect(tx).to.emit(web3market, "List");
    });

  });

  describe("Buying", () => {

    beforeEach(async () => {
      //List an item
      tx = await web3market.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, PRICE, RATING, STOCK);
      await tx.wait();

      //Buy item
      tx = await web3market.connect(buyer).buy(ID, {value: PRICE});
    });

    it("Updates contract balance", async () => {
      const result = await ethers.provider.getBalance(web3market.address);
      expect(result).to.equal(PRICE);
    });

    it("Updates order count", async () => {
      const result = await web3market.orderCount(buyer.address);
      expect(result).to.equal(1);
    });

    it("Adds order", async () => {
      const order = await web3market.orders(buyer.address, 1);
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    });

    it("Emits BUY event", async () => {
      expect(tx).to.emit(web3market, "Buy");
    });

  });

  describe("Withdrawing", () => {
    let balanceBefore;

    beforeEach(async () => {
      // List item
      let tx = await web3market.connect(deployer).list(ID, NAME, CATEGORY, IMAGE, PRICE, RATING, STOCK);
      await tx.wait();

      // Buy item
      tx = await web3market.connect(buyer).buy(ID, { value: PRICE });
      await tx.wait();

      //Get deployer balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address);

      //Withdraw
      tx = await web3market.connect(deployer).withdraw();
      await tx.wait();
    });

    it('Updates the owner balance', async () => {
      const balanceAfter = await ethers.provider.getBalance(deployer.address);
      expect(balanceAfter).to.be.greaterThan(balanceBefore);
    });

    it('Updates the contract balance', async () => {
      const result = await ethers.provider.getBalance(web3market.address);
      expect(result).to.equal(0);
    });
  });
});