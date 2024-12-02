'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpCircle, ArrowDownCircle, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ProposalCard({ proposal }) {
  const [votes, setVotes] = useState(proposal.votes)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [voteType, setVoteType] = useState(null)

  const router = useRouter()
  const handleVote = (type) => {
    setVoteType(type)
    setShowConfirmation(true)
  }

  const confirmVote = () => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [voteType]: prevVotes[voteType] + 1,
    }))
    setShowConfirmation(false)
  }

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  let isOpen = true;
  if(currentPath.search('open') === -1) {
    isOpen = false;
  }

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {proposal.isHot && (
        <div className="absolute top-2 right-2 text-yellow-400 animate-pulse">
          <Zap size={24} />
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-blue-400" onClick={() => {
        if(currentPath.search('open') === -1) {
          router.push(`/proposals/${proposal.id}`)
        }
      }}>{proposal.title}</h3>
      <p className="text-gray-300 mb-4">{proposal.description}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-green-400 font-semibold">
          ${proposal.fundingRequested.toLocaleString()}
        </span>
        <span className="text-purple-400">{proposal.status}</span>
      </div>
      <div className="text-sm text-gray-400 mb-4">
        Voting ends: {new Date(proposal.deadline).toLocaleDateString()}
      </div>
      <div className="flex justify-between items-center">
        <motion.button
          className="flex items-center space-x-2 text-green-400 hover:text-green-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('up')}
          disabled={!isOpen}
        >
          <ArrowUpCircle size={20} />
          <span>{votes.up}</span>
        </motion.button>
        <motion.button
          className="flex items-center space-x-2 text-red-400 hover:text-red-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleVote('down')}
          // disabled={!isOpen}
        >
          <ArrowDownCircle size={20} />
          <span>{votes.down}</span>
        </motion.button>
      </div>
      {showConfirmation && (
        <motion.div
          className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <p className="mb-4">Are you sure you want to {voteType === 'up' ? 'upvote' : 'downvote'} this proposal?</p>
            <div className="space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={confirmVote}
                disabled={!isOpen}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => setShowConfirmation(false)}
                // disabled={!isOpen}
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
