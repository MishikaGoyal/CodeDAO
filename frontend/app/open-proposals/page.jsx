import Navbar from "@/components/Navbar";
import ProposalList from "@/components/proposal-list";
import { proposals } from "@/components/constants";

export default function Dashboard() {
  return (
    (<div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="container mx-auto p-4">
        <ProposalList proposals={proposals.filter((proposal)=> proposal.status != 'Active')} />
      </main>
    </div>)
  );
}

