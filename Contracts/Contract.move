module code_dao::code_dao {
    use std::string::{Self, String};
    use std::vector;
    use sui::object::{Self, UID, ID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::balance::{Self, Balance};
    use sui::event;
    use sui::table::{Self, Table};

    // Constants
    const CYCLE_DURATION: u64 = 90 * 24 * 60 * 60; // 90 days in seconds
    const VOTE_THRESHOLD_PERCENTAGE: u64 = 51;
    const MAX_FUNDING: u64 = 10_000_000_000; // 10 SUI in MIST

    // Error codes
    const EInvalidFunding: u64 = 0;
    const ENotParticipant: u64 = 1;
    const ENotVoter: u64 = 2;
    const EInvalidVotingPhase: u64 = 3;
    const EAlreadyVoted: u64 = 4;
    const EProjectNotApproved: u64 = 5;
    const EInsufficientFunds: u64 = 6;

    // Enums as structs (Sui Move doesn't have direct enum support)
    struct ProposalStatus has copy, drop, store {
        status: u8
    }

    struct MilestoneStatus has copy, drop, store {
        status: u8
    }

    // Status constants
    const PROPOSAL_PENDING: u8 = 0;
    const PROPOSAL_VOTING: u8 = 1;
    const PROPOSAL_APPROVED: u8 = 2;
    const PROPOSAL_REJECTED: u8 = 3;
    const PROPOSAL_ACTIVE: u8 = 4;
    const PROPOSAL_COMPLETED: u8 = 5;

    const MILESTONE_PENDING: u8 = 0;
    const MILESTONE_IN_PROGRESS: u8 = 1;
    const MILESTONE_SUBMITTED: u8 = 2;
    const MILESTONE_APPROVED: u8 = 3;
    const MILESTONE_REJECTED: u8 = 4;

    // Structs
    struct Participant has key, store {
        id: UID,
        wallet_address: address,
        skills: String,
        completed_projects: u64,
        reputation: u64
    }

    struct Milestone has key, store {
        id: UID,
        description: String,
        funding_amount: u64,
        status: MilestoneStatus
    }

    struct ProjectProposal has key, store {
        id: UID,
        proposer: address,
        title: String,
        description: String,
        github_repo: String,
        project_domain: String,
        funding_requested: u64,
        cycle: u64,
        status: ProposalStatus,
        votes_for: u64,
        votes_against: u64,
        voted_addresses: vector<address>
    }

    struct Cycle has key, store {
        id: UID,
        start_time: u64,
        end_time: u64
    }

    // Main DAO struct
    struct CodeDAO has key {
        id: UID,
        participants: Table<address, Participant>,
        projects: Table<u64, ProjectProposal>,
        project_milestones: Table<u64, vector<Milestone>>,
        treasury_balance: Balance<SUI>,
        project_count: u64,
        current_cycle: u64
    }

    // Events
    struct ParticipantRegistered has copy, drop {
        participant: address
    }

    struct ProjectProposed has copy, drop {
        project_id: u64,
        proposer: address,
        title: String
    }

    // Initializer function (constructor equivalent)
    fun init(ctx: &mut TxContext) {
        let dao = CodeDAO {
            id: object::new(ctx),
            participants: table::new(ctx),
            projects: table::new(ctx),
            project_milestones: table::new(ctx),
            treasury_balance: balance::zero(),
            project_count: 0,
            current_cycle: 1
        };

        let initial_cycle = Cycle {
            id: object::new(ctx),
            start_time: tx_context::epoch_timestamp_ms(ctx) / 1000,
            end_time: (tx_context::epoch_timestamp_ms(ctx) / 1000) + CYCLE_DURATION
        };

        transfer::share_object(dao);
        transfer::share_object(initial_cycle);
    }

    // Register as Participant
    public fun register_participant(
        dao: &mut CodeDAO, 
        skills: vector<u8>, 
        ctx: &mut TxContext
    ) {
        let participant = Participant {
            id: object::new(ctx),
            wallet_address: tx_context::sender(ctx),
            skills: string::utf8(skills),
            completed_projects: 0,
            reputation: 0
        };

        table::add(&mut dao.participants, tx_context::sender(ctx), participant);
        
        event::emit(ParticipantRegistered { 
            participant: tx_context::sender(ctx) 
        });
    }

    // Propose Project
    public fun propose_project(
        dao: &mut CodeDAO,
        title: vector<u8>,
        description: vector<u8>,
        github_repo: vector<u8>,
        project_domain: vector<u8>,
        funding_requested: u64,
        ctx: &mut TxContext
    ) {
        // Validate funding
        assert!(funding_requested > 0 && funding_requested <= MAX_FUNDING, EInvalidFunding);

        let proposal = ProjectProposal {
            id: object::new(ctx),
            proposer: tx_context::sender(ctx),
            title: string::utf8(title),
            description: string::utf8(description),
            github_repo: string::utf8(github_repo),
            project_domain: string::utf8(project_domain),
            funding_requested,
            cycle: dao.current_cycle,
            status: ProposalStatus { status: PROPOSAL_VOTING },
            votes_for: 0,
            votes_against: 0,
            voted_addresses: vector::empty()
        };

        // Add project to DAO
        table::add(&mut dao.projects, dao.project_count, proposal);
        
        // Emit event
        event::emit(ProjectProposed { 
            project_id: dao.project_count, 
            proposer: tx_context::sender(ctx),
            title: string::utf8(title)
        });

        // Increment project count
        dao.project_count = dao.project_count + 1;
    }

    // More methods would be added here to implement full functionality
    // Such as voting, milestone creation, fund release, etc.

    // Placeholder for additional methods
    #[test_only]
    public fun test_init(ctx: &mut TxContext) {
        init(ctx);
    }
}