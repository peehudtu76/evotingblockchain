require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.INFURA_SEPOLIA_URL,  // ✅ Correct way to access the URL
      accounts: [process.env.PRIVATE_KEY],  // ✅ Correct way to access the private key
    },
  },
};
