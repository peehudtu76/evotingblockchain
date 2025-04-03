const express = require("express");
const { getCandidates, vote, getReputation } = require("../controllers/votingController");

const router = express.Router();

router.get("/candidates", getCandidates);
router.post("/vote", vote);
router.get("/reputation/:address", getReputation);

module.exports = router;
