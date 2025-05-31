import { ethers } from "hardhat";
import { expect } from "chai";

describe("GeneScope", function () {
  it("should create and retrieve a claim", async function () {
    const GeneScope = await ethers.getContractFactory("GeneScope");
    const geneScope = await GeneScope.deploy();
    await geneScope.waitForDeployment();

    const [owner] = await ethers.getSigners();

    const ipfsHash = "QmFakeHash123";
    const scope = 2; // Academic
    const validUntil = Math.floor(Date.now() / 1000) + 3600 * 24 * 365; // 1 year from now
    const tags = ["BRCA1", "genetics", "cancer"];

    const tx = await geneScope.createClaim(ipfsHash, scope, validUntil, tags);
    await tx.wait();

    const claim = await geneScope.getClaim(0);

    expect(claim.owner).to.equal(owner.address);
    expect(claim.ipfsHash).to.equal(ipfsHash);
    expect(claim.scope).to.equal(scope);
    expect(claim.validUntil).to.equal(validUntil);
    expect(claim.tags).to.deep.equal(tags);
  });
  it("should allow the owner to delete their claim", async function () {
    const GeneScope = await ethers.getContractFactory("GeneScope");
    const geneScope = await GeneScope.deploy();
    await geneScope.waitForDeployment();
  
    const [owner] = await ethers.getSigners();
  
    const ipfsHash = "QmDeleteTest123";
    const scope = 1; // Clinical
    const validUntil = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;
    const tags = ["TP53", "deletion test"];
  
    // Create the claim
    await geneScope.createClaim(ipfsHash, scope, validUntil, tags);
  
    // Delete the claim
    await geneScope.deleteClaim(0);
  
    // Retrieve the deleted claim
    const deletedClaim = await geneScope.getClaim(0);
  
    // Check that fields are reset to defaults
    expect(deletedClaim.owner).to.equal(ethers.ZeroAddress);
    expect(deletedClaim.ipfsHash).to.equal("");
    expect(deletedClaim.tags.length).to.equal(0);
  });
});
