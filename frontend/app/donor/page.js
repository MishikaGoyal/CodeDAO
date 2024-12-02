"use client";

import Navbar from '@/components/Navbar';
import { ProposalDashboard } from '@/components/ProposalDashboard'
import { ContributionOverview } from '@/components/contribution-overview';

const OKTO_CLIENT_API_KEY = "0059d583-199a-42c2-986b-9220ab7ad7af";

export default function Home() {
  // In a real application, you might get this ID from the URL or user interaction
  const proposalId = 1;

  return (
    (<main className="bg-gray-900 min-h-screen px-[15px]">
      {/* <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}> */}
        <Navbar />
        <ContributionOverview />
        {/* <LoginPage /> */}
      {/* </OktoProvider> */}
    </main>)
  );
}
