const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
  let Voting, voting;
  let owner, addr1, addr2;
  let candidateNames = ["Alice", "Bob", "Charlie"];

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract with candidate names
    Voting = await ethers.getContractFactory("Voting");
    voting = await Voting.deploy(candidateNames);

    // Wait for deployment to be mined
    await voting.waitForDeployment();
  });

  it("Should deploy successfully", async function () {
    expect(await voting.getCandidates()).to.be.an("array");
  });

  it("Should have correct candidate names", async function () {
    const candidates = await voting.getCandidates();
    expect(candidates.length).to.equal(3);
    expect(candidates[0].name).to.equal("Alice");
    expect(candidates[1].name).to.equal("Bob");
    expect(candidates[2].name).to.equal("Charlie");
  });

  it("Should allow voting", async function () {
    await voting.connect(addr1).vote(0);
    const candidates = await voting.getCandidates();
    expect(candidates[0].votes).to.equal(1);
  });

  it("Should not allow double voting", async function () {
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted!");
  });
});
