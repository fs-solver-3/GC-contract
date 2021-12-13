const { ethers, upgrades } = require("hardhat");

async function main() {
  const XO2CoinInstance = await ethers.getContractFactory("Xo2CoinUpgraeable");
  const XO2CoinContract = await upgrades.deployProxy(XO2CoinInstance);
  await XO2CoinContract.deployed();
  console.log("XO2Coin Contract is deployed to:", XO2CoinContract.address);
}

main();
