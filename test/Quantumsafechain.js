const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Project (QuantumSafe Chain)", function () {
  let Project, project, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Project = await ethers.getContractFactory("Project");
    project = await Project.deploy();
    await project.deployed();
  });

  it("Should deploy with correct owner", async function () {
    expect(await project.owner()).to.equal(owner.address);
  });

  it("Should allow adding a transaction", async function () {
    const txData = "EncryptedPQData123";
    await expect(project.connect(addr1).addTransaction(txData))
      .to.emit(project, "TransactionAdded")
      .withArgs(1, addr1.address, txData, anyValue); // timestamp = anyValue

    const tx = await project.getTransaction(1);
    expect(tx.id).to.equal(1);
    expect(tx.sender).to.equal(addr1.address);
    expect(tx.encryptedData).to.equal(txData);
  });

  it("Should revert when accessing non-existent transaction", async function () {
    await expect(project.getTransaction(99)).to.be.revertedWith("Transaction not found");
  });

  it("Should transfer ownership", async function () {
    await expect(project.transferOwnership(addr1.address))
      .to.emit(project, "OwnershipTransferred")
      .withArgs(owner.address, addr1.address);

    expect(await project.owner()).to.equal(addr1.address);
  });

  it("Should not allow non-owner to transfer ownership", async function () {
    await expect(
      project.connect(addr1).transferOwnership(addr2.address)
    ).to.be.revertedWith("Not contract owner");
  });
});
