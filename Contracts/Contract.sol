// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract CodeDAO is AccessControl, ReentrancyGuard {
    // Role Definitions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant PARTICIPANT_ROLE = keccak256("PARTICIPANT_ROLE");
    bytes32 public constant VOTER_ROLE = keccak256("VOTER_ROLE");

    // Participant Struct
    struct Participant {
        address walletAddress;
        string skills;
        uint256 completedProjects;
        uint256 reputation;
    }

    // Project Proposal Struct
    struct ProjectProposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string githubRepo;
        string projectDomain;
        uint256 fundingRequested;
        uint256 cycle;
        ProposalStatus status;
        
        // Voting mechanism
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) hasVoted;
    }

    // Milestone Struct
    struct Milestone {
        uint256 id;
        string description;
        uint256 fundingAmount;
        MilestoneStatus status;
    }

    // Cycle Struct
    struct Cycle {
        uint256 startTime;
        uint256 endTime;
    }

    // Enums
    enum ProposalStatus {
        Pending,
        Voting,
        Approved,
        Rejected,
        Active,
        Completed
    }

    enum MilestoneStatus {
        Pending,
        InProgress,
        Submitted,
        Approved,
        Rejected
    }

    // State Variables
    uint256 public constant CYCLE_DURATION = 90 days;
    uint256 public constant VOTE_THRESHOLD_PERCENTAGE = 51; // 51% needed to approve

    // Mappings
    mapping(address => Participant) public participants;
    mapping(uint256 => ProjectProposal) public projectProposals;
    mapping(uint256 => Milestone[]) public projectMilestones;
    mapping(address => uint256[]) public participantProjects;
    mapping(uint256 => Cycle) public cycles;

    // Counters
    uint256 public projectCount;
    uint256 public currentCycle;

    // Treasury Management
    uint256 public treasuryBalance;

    // Events
    event ParticipantRegistered(address participant);
    event VoterRegistered(address voter, uint256 contribution);
    event ProjectProposed(uint256 projectId, address proposer, string title);
    event ProjectVoted(uint256 projectId, address voter, bool support);
    event ProjectStatusChanged(uint256 projectId, ProposalStatus newStatus);
    event MilestoneCreated(uint256 projectId, uint256 milestoneId);
    event MilestoneApproved(uint256 projectId, uint256 milestoneId);
    event FundsReleased(uint256 projectId, uint256 milestoneId, uint256 amount);
    event CycleStarted(uint256 cycleNumber, uint256 startTime, uint256 endTime);

    // Constructor
    constructor(address initialAdmin) {
        _setupRole(DEFAULT_ADMIN_ROLE, initialAdmin);
        _setupRole(ADMIN_ROLE, initialAdmin);
        
        projectCount = 0;
        currentCycle = 1;
        
        // Initialize first cycle
        cycles[currentCycle] = Cycle({
            startTime: block.timestamp,
            endTime: block.timestamp + CYCLE_DURATION
        });
        
        emit CycleStarted(currentCycle, cycles[currentCycle].startTime, cycles[currentCycle].endTime);
    }

    // Register as a Participant
    function registerParticipant(string memory skills) external {
        Participant storage participant = participants[msg.sender];
        participant.walletAddress = msg.sender;
        participant.skills = skills;
        
        _setupRole(PARTICIPANT_ROLE, msg.sender);
        
        emit ParticipantRegistered(msg.sender);
    }

    // Register as a Voter (by contributing to the DAO)
    function registerAsVoter() external payable {
        require(msg.value > 0, "Contribution must be greater than 0");
        
        treasuryBalance += msg.value;
        
        // Grant voter role
        _setupRole(VOTER_ROLE, msg.sender);
        
        emit VoterRegistered(msg.sender, msg.value);
    }

    // Propose a Project
    function proposeProject(
        string memory title,
        string memory description,
        string memory githubRepo,
        string memory projectDomain,
        uint256 fundingRequested
    ) external onlyRole(PARTICIPANT_ROLE) {
        require(fundingRequested > 0 && fundingRequested <= 10 ether, "Invalid funding amount");

        ProjectProposal storage proposal = projectProposals[projectCount];
        proposal.id = projectCount;
        proposal.proposer = msg.sender;
        proposal.title = title;
        proposal.description = description;
        proposal.githubRepo = githubRepo;
        proposal.projectDomain = projectDomain;
        proposal.fundingRequested = fundingRequested;
        proposal.cycle = currentCycle;
        proposal.status = ProposalStatus.Voting;

        emit ProjectProposed(projectCount, msg.sender, title);
        projectCount++;
    }

    // Vote on Project Proposal
    function voteOnProject(uint256 projectId, bool support) external onlyRole(VOTER_ROLE) {
        ProjectProposal storage proposal = projectProposals[projectId];
        require(proposal.status == ProposalStatus.Voting, "Project not in voting phase");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        if (support) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        proposal.hasVoted[msg.sender] = true;

        emit ProjectVoted(projectId, msg.sender, support);

        // Check if voting is complete
        _checkProjectVotingResult(projectId);
    }

    // Internal function to check project voting result
    function _checkProjectVotingResult(uint256 projectId) internal {
        ProjectProposal storage proposal = projectProposals[projectId];
        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        
        if (totalVotes >= (treasuryBalance / 1 ether)) {
            if (proposal.votesFor > (totalVotes * VOTE_THRESHOLD_PERCENTAGE / 100)) {
                proposal.status = ProposalStatus.Approved;
            } else {
                proposal.status = ProposalStatus.Rejected;
            }
            
            emit ProjectStatusChanged(projectId, proposal.status);
        }
    }

    // Create Milestone
    function createMilestone(
        uint256 projectId, 
        string memory description, 
        uint256 fundingAmount
    ) external onlyRole(PARTICIPANT_ROLE) {
        ProjectProposal storage proposal = projectProposals[projectId];
        require(proposal.status == ProposalStatus.Approved, "Project not approved");
        require(fundingAmount <= proposal.fundingRequested, "Funding exceeds project budget");

        Milestone storage milestone = projectMilestones[projectId].push();
        milestone.id = projectMilestones[projectId].length - 1;
        milestone.description = description;
        milestone.fundingAmount = fundingAmount;
        milestone.status = MilestoneStatus.Pending;

        emit MilestoneCreated(projectId, milestone.id);
    }

    // Approve Milestone (Admin only)
    function approveMilestone(
        uint256 projectId, 
        uint256 milestoneId
    ) external onlyRole(ADMIN_ROLE) {
        Milestone storage milestone = projectMilestones[projectId][milestoneId];
        ProjectProposal storage proposal = projectProposals[projectId];
        
        require(milestone.status == MilestoneStatus.Pending, "Milestone not pending");

        // Approve milestone
        milestone.status = MilestoneStatus.Approved;
        
        // Release funds
        (bool success, ) = proposal.proposer.call{value: milestone.fundingAmount}("");
        require(success, "Fund transfer failed");
        
        emit MilestoneApproved(projectId, milestoneId);
        emit FundsReleased(projectId, milestoneId, milestone.fundingAmount);
    }

    // Close Cycle and Start New Cycle
    function closeCycle() external onlyRole(ADMIN_ROLE) {
        // Ensure current cycle has ended
        require(block.timestamp >= cycles[currentCycle].endTime, "Current cycle not ended");
        
        // Increment cycle
        currentCycle++;
        
        // Set new cycle times
        cycles[currentCycle] = Cycle({
            startTime: block.timestamp,
            endTime: block.timestamp + CYCLE_DURATION
        });
        
        emit CycleStarted(currentCycle, cycles[currentCycle].startTime, cycles[currentCycle].endTime);
    }

    // Contribute to DAO Treasury
    function contribute() external payable {
        treasuryBalance += msg.value;
    }

    // Fallback function
    receive() external payable {
        treasuryBalance += msg.value;
    }
}