import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "hardhat";

async function main() {
  console.log("Deploying GeneScope contract...");
  
  const GeneScope = await ethers.getContractFactory("GeneScope");
  const geneScope = await GeneScope.deploy();
  
  await geneScope.waitForDeployment();
  const address = await geneScope.getAddress();
  
  console.log(`GeneScope deployed to: ${address}`);
  
  // Save the address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: address,
    network: "sepolia"
  };
  
  fs.writeFileSync('./contract-address.json', JSON.stringify(contractInfo, null, 2));
  console.log("Contract address saved to contract-address.json");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});