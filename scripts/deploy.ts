import { ethers } from "hardhat";

async function main() {
  const GeneScope = await ethers.getContractFactory("GeneScope");
  const geneScope = await GeneScope.deploy();
  await geneScope.waitForDeployment();

  console.log(`GeneScope deployed to: ${await geneScope.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});