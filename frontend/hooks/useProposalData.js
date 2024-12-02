import { proposals } from '@/components/constants';
import { useState, useEffect } from 'react';

// Mock data function (replace this with actual data fetching logic)
const fetchMockProposal = id => {
  return proposals.find((proposal)=> proposal.id === parseInt(id))[0];
};

export const useProposalData = (proposalId) => {
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // In a real application, you would fetch data from your blockchain or API here
      const data = fetchMockProposal(proposalId);
      console.log(data);
      setProposal(data);
      setLoading(false);
    };

    fetchData();
    console.log(proposal);
  }, [proposalId]);
  return { proposal, loading };
};