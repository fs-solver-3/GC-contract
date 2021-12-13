const { ethers, upgrades } = require("hardhat");

async function main() {
  const GCUCInstance = await ethers.getContractFactory("GCUC");
  const GCUCContract = await GCUCInstance.deploy();
  console.log("GCUC Contract is deployed to:", GCUCContract.address);
}

main();
