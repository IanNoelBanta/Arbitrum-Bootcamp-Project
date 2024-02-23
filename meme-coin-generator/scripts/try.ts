const { ethers } = require("hardhat");
const { expect } = require('chai');

async function main() {
  const [owner] = await ethers.getSigners();
  // const initialSupply = ethers.parseUnits("1000", 18);
  const myTokenContract = await ethers.deployContract("ZZZ", [owner.address]);
  await myTokenContract.waitForDeployment();

  await myTokenContract.connect(owner).mint(owner.address, 20);

  await myTokenContract.connect(owner).stake(10);
  
  const elapsedStakeTime = await myTokenContract.getElapsedStakeTime();
  console.log("Elapsed Stake Time (seconds):", elapsedStakeTime.toString());


}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});