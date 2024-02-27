const { ethers } = require("hardhat");
const { expect } = require('chai');

async function main() {
  const [owner] = await ethers.getSigners();
  // const initialSupply = ethers.parseUnits("1000", 18);
  const myTokenContract = await ethers.deployContract("ZZZ", [owner.address]);
  await myTokenContract.waitForDeployment();

  console.log(`Contract deployed to ${myTokenContract.target}`);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});