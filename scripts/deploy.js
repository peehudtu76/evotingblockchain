const hre = require("hardhat");

async function main() {
    const Voting = await hre.ethers.getContractFactory("Voting");

    // Define the list of candidates
    const candidateNames = ["Alice", "Bob", "Charlie"];

    // Deploy the contract with candidate names as constructor arguments
    const voting = await Voting.deploy(candidateNames);

    // Wait for deployment to complete
    await voting.waitForDeployment();

    console.log(`Contract deployed at: ${voting.target}`);
}

// Execute the script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
