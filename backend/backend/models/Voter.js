const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, unique: true },
    reputation: { type: Number, default: 1 },
    hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Voter", VoterSchema);
