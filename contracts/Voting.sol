// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 votes;
    }

    struct Voter {
        bool hasVoted;
        uint256 reputation;
    }

    address public admin;
    mapping(address => Voter) public voters;
    Candidate[] public candidates;

    event Voted(address indexed voter, uint256 candidateIndex);
    event ReputationUpdated(address indexed voter, uint256 reputation);

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
    }

    function vote(uint256 candidateIndex) public {
        require(!voters[msg.sender].hasVoted, "You have already voted!");
        require(candidateIndex < candidates.length, "Invalid candidate index!");

        candidates[candidateIndex].votes += 1;
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].reputation += 1;

        emit Voted(msg.sender, candidateIndex);
        emit ReputationUpdated(msg.sender, voters[msg.sender].reputation);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getReputation(address voter) public view returns (uint256) {
        return voters[voter].reputation;
    }

    function resetVotes() public {
        require(msg.sender == admin, "Only admin can reset votes");
        for (uint i = 0; i < candidates.length; i++) {
            candidates[i].votes = 0;
        }
    }
}
