// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying QuantumSafe Chain contract...");

  // Compile contracts (optional if already compiled)
  await hre.run("compile");

  // Get contract factory
  const Project = await hre.ethers.getContractFactory("Project");

  // Deploy
  const project = await Project.deploy();
  await project.deployed();

  console.log(`✅ Contract deployed to: ${project.address}`);
  console.log("⚠️ Copy this address into frontend/app.js -> contractAddress");
}

// Recommended pattern to handle async/await errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
