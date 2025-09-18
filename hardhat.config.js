require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, SEPOLIA_RPC_URL, POLYGON_MUMBAI_RPC_URL, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},

    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },

    polygonMumbai: {
      url: POLYGON_MUMBAI_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY || "",
  },
};
