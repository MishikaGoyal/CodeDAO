'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ProposalCard } from './proposal-card';

const ProposalList = ({ proposals }) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {proposals.map((proposal) => (
        <motion.div
          key={proposal.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <ProposalCard proposal={proposal} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProposalList;
