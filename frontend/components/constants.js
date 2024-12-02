// export const proposals = [
//     {
//       id: '1',
//       title: 'Implement Staking Rewards',
//       description: 'Develop a staking mechanism to incentivize long-term token holding.',
//       fundingAmount: 50000,
//       deadline: '2023-12-31',
//       status: 'Active',
//       votes: { up: 120, down: 30 },
//       isHot: true,
//     },
//     {
//       id: '2',
//       title: 'Community Governance Portal',
//       description: 'Create a user-friendly interface for community voting and proposal submission.',
//       fundingAmount: 75000,
//       deadline: '2024-01-15',
//       status: 'Active',
//       votes: { up: 85, down: 15 },
//       isHot: false,
//     },
//     {
//       id: '3',
//       title: 'Cross-Chain Integration',
//       description: 'Develop bridges to enable seamless asset transfer between multiple blockchains.',
//       fundingAmount: 100000,
//       deadline: '2024-02-28',
//       status: 'Active',
//       votes: { up: 200, down: 50 },
//       isHot: true,
//     },
// ];

export const proposals = [
    {
        id: 101,
        proposer: {
          address: '0xabcd...ef12',
          githubUsername: 'id-dev',
          profileUrl: 'https://github.com/id-dev',
        },
        title: 'Decentralized Identity Verification',
        description: 'A self-sovereign identity verification system using Ethereum and decentralized identifiers (DIDs). This project allows users to control their identity while providing verifiable credentials to organizations.',
        githubRepo: 'https://github.com/example/identity-verification',
        projectDomain: 'Identity',
        fundingRequested: 8000,
        cycle: 1,
        status: 'Active',
        votesFor: 220,
        votesAgainst: 40,
        votes: {
            up: 220,
            down: 40
        },
        milestones: [
          {
            id: 1,
            description: 'Develop smart contracts for DIDs and credential issuance',
            fundingAmount: 2000,
            status: 'Approved'
          },
          {
            id: 2,
            description: 'Integrate with Ethereum wallets for credential management',
            fundingAmount: 3000,
            status: 'InProgress'
          },
          {
            id: 3,
            description: 'Develop a user-friendly interface for managing DIDs',
            fundingAmount: 3000,
            status: 'Pending'
          }
        ],
        recentPullRequests: [
          {
            id: 1,
            title: 'Implement DID creation and verification',
            author: 'did-builder',
            status: 'merged',
            createdAt: '2024-01-01T12:00:00Z'
          },
          {
            id: 2,
            title: 'Add support for credential revocation',
            author: 'credential-expert',
            status: 'open',
            createdAt: '2024-01-02T15:30:00Z'
          }
        ]
      },
      {
        id: 102,
        proposer: {
          address: '0x3456...7890',
          githubUsername: 'fundraiser-dev',
          profileUrl: 'https://github.com/fundraiser-dev',
        },
        title: 'Tokenized Crowdfunding Platform',
        description: 'A platform to facilitate tokenized crowdfunding campaigns. Contributors receive reward tokens proportional to their contributions, enabling a transparent and engaging fundraising process.',
        githubRepo: 'https://github.com/example/token-crowdfunding',
        projectDomain: 'Finance',
        fundingRequested: 10000,
        cycle: 1,
        status: 'Active',
        votesFor: 300,
        votesAgainst: 20,
        votes: {
            up: 300,
            down: 20
        },
        milestones: [
          {
            id: 1,
            description: 'Develop core smart contracts for token distribution',
            fundingAmount: 4000,
            status: 'Approved'
          },
          {
            id: 2,
            description: 'Create campaign management interface for users',
            fundingAmount: 4000,
            status: 'Pending'
          },
          {
            id: 3,
            description: 'Implement campaign analytics and reporting',
            fundingAmount: 2000,
            status: 'Pending'
          }
        ],
        recentPullRequests: [
          {
            id: 1,
            title: 'Add ERC20-based reward token functionality',
            author: 'erc20-master',
            status: 'merged',
            createdAt: '2024-01-03T09:00:00Z'
          },
          {
            id: 2,
            title: 'Integrate campaign dashboard UI',
            author: 'ui-designer',
            status: 'open',
            createdAt: '2024-01-05T11:45:00Z'
          }
        ]
      },
      {
        id: 103,
        proposer: {
          address: '0x9876...5432',
          githubUsername: 'dao-dev',
          profileUrl: 'https://github.com/dao-dev',
        },
        title: 'DAO Governance Tool',
        description: 'An intuitive DAO governance tool to enable efficient decision-making within decentralized organizations. This tool integrates voting mechanisms, proposal tracking, and token-weighted governance.',
        githubRepo: 'https://github.com/example/dao-governance',
        projectDomain: 'Governance',
        fundingRequested: 7000,
        cycle: 1,
        status: 'Active',
        votesFor: 180,
        votesAgainst: 50,
        votes: {
            up: 180,
            down: 50
        },
        milestones: [
          {
            id: 1,
            description: 'Build governance smart contracts',
            fundingAmount: 3000,
            status: 'Approved'
          },
          {
            id: 2,
            description: 'Develop a voting interface',
            fundingAmount: 2000,
            status: 'InProgress'
          },
          {
            id: 3,
            description: 'Integrate real-time proposal updates',
            fundingAmount: 2000,
            status: 'Pending'
          }
        ],
        recentPullRequests: [
          {
            id: 1,
            title: 'Implement quadratic voting logic',
            author: 'math-wiz',
            status: 'merged',
            createdAt: '2024-01-07T10:30:00Z'
          },
          {
            id: 2,
            title: 'Enhance UI for proposal submission',
            author: 'frontend-pro',
            status: 'open',
            createdAt: '2024-01-09T13:15:00Z'
          }
        ]
      },
      {
        id: 104,
        proposer: {
          address: '0xa1b2...c3d4',
          githubUsername: 'content-dev',
          profileUrl: 'https://github.com/content-dev',
        },
        title: 'Blockchain-Based Content Marketplace',
        description: 'A decentralized marketplace for creators to monetize their content directly. Content is tokenized as NFTs, enabling ownership and royalty distribution.',
        githubRepo: 'https://github.com/example/content-marketplace',
        projectDomain: 'Content',
        fundingRequested: 12000,
        cycle: 1,
        status: 'Pending',
        votesFor: 250,
        votesAgainst: 30,
        votes: {
            up: 250,
            down: 30
        },
        milestones: [
          {
            id: 1,
            description: 'Develop NFT-based content ownership model',
            fundingAmount: 5000,
            status: 'Approved'
          },
          {
            id: 2,
            description: 'Create marketplace interface for transactions',
            fundingAmount: 4000,
            status: 'InProgress'
          },
          {
            id: 3,
            description: 'Implement royalty tracking and distribution',
            fundingAmount: 3000,
            status: 'Pending'
          }
        ],
        recentPullRequests: [
          {
            id: 1,
            title: 'Integrate IPFS for content storage',
            author: 'ipfs-integration',
            status: 'merged',
            createdAt: '2024-01-10T09:00:00Z'
          },
          {
            id: 2,
            title: 'Add search functionality for content discovery',
            author: 'search-master',
            status: 'open',
            createdAt: '2024-01-12T15:00:00Z'
          }
        ]
      },
      {
        id: 105,
        proposer: {
          address: '0xef12...34ab',
          githubUsername: 'social-dev',
          profileUrl: 'https://github.com/social-dev',
        },
        title: 'Decentralized Social Network',
        description: 'A Web3-based social networking platform where users retain control of their data. Features include decentralized profiles, tokenized rewards for engagement, and censorship resistance.',
        githubRepo: 'https://github.com/example/decentralized-social',
        projectDomain: 'Social',
        fundingRequested: 15000,
        cycle: 1,
        status: 'Pending',
        votesFor: 320,
        votesAgainst: 40,
        votes: {
            up: 320,
            down: 40
        },
        milestones: [
          {
            id: 1,
            description: 'Develop decentralized profile system',
            fundingAmount: 6000,
            status: 'Approved'
          },
          {
            id: 2,
            description: 'Implement engagement rewards through tokens',
            fundingAmount: 5000,
            status: 'InProgress'
          },
          {
            id: 3,
            description: 'Build a decentralized content moderation system',
            fundingAmount: 4000,
            status: 'Pending'
          }
        ],
        recentPullRequests: [
          {
            id: 1,
            title: 'Add decentralized login system',
            author: 'login-guru',
            status: 'merged',
            createdAt: '2024-01-14T11:00:00Z'
          },
          {
            id: 2,
            title: 'Implement post-sharing feature',
            author: 'post-master',
            status: 'open',
            createdAt: '2024-01-15T10:00:00Z'
          }
        ]
      }                              
]