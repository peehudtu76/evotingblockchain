const Voter = require("../models/Voter");
const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
const contractABI = require("../VotingABI.json");
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, provider);

exports.getCandidates = async (req, res) => {
    try {
        const candidates = await contract.getCandidates();
        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.vote = async (req, res) => {
    const { voterAddress, candidateIndex } = req.body;

    try {
        let voter = await Voter.findOne({ walletAddress: voterAddress });
        if (!voter) {
            voter = new Voter({ walletAddress: voterAddress });
        }
        if (voter.hasVoted) return res.status(400).json({ error: "Already voted!" });

        const signer = provider.getSigner(voterAddress);
        const voteTx = await contract.connect(signer).vote(candidateIndex);
        await voteTx.wait();

        voter.hasVoted = true;
        voter.reputation += 1;
        await voter.save();

        res.json({ message: "Vote submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReputation = async (req, res) => {
    try {
        const voter = await Voter.findOne({ walletAddress: req.params.address });
        if (!voter) return res.status(404).json({ error: "Voter not found" });

        res.json({ reputation: voter.reputation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
