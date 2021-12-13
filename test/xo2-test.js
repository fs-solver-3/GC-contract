const {
  constants,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { ZERO_ADDRESS } = constants;
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");
const Web3 = require("web3");

let Xo2CoinInstance;
let Xo2CoinContract;
let presaleInstance;
let presaleContract;
let owner;
let account1;
let rate = 20000;
let tokenDecimals = 18;

describe("XO2Coin", function () {
  beforeEach(async function () {
    [owner, account1] = await ethers.getSigners();
    Xo2CoinInstance = await ethers.getContractFactory("XO2Coin");
    Xo2CoinContract = await Xo2CoinInstance.deploy();
    await Xo2CoinContract.deployed();
    //mint to all users and presaleContract for testing presale features
    await Xo2CoinContract.mintTokens(
      owner.address,
      ethers.utils.parseEther("20000")
    );
    await Xo2CoinContract.mintTokens(
      account1.address,
      ethers.utils.parseEther("20000")
    );
  });
  describe("once deployed, when buy tokens", function () {
    it("sucess initial mint to basecontract, owner, user", async function () {
      expect(await Xo2CoinContract.balanceOf(owner.address)).to.be.equal(
        ethers.utils.parseEther("20000")
      );
      expect(await Xo2CoinContract.balanceOf(account1.address)).to.be.equal(
        ethers.utils.parseEther("20000")
      );
    });
    it("Buy action success", async function () {
      // transfer
      const amount = ethers.utils.parseEther("1000");
      buyTokensResult = await Xo2CoinContract.buyProducts(
        account1.address,
        amount,
        21
      );
      await buyTokensResult.wait();
      // expect values
      expect(await Xo2CoinContract.balanceOf(account1.address)).to.be.equal(
        ethers.utils.parseEther("21000")
      );
      expect(await Xo2CoinContract.balanceOf(owner.address)).to.be.equal(
        ethers.utils.parseEther("19000")
      );
    });
  });
});
