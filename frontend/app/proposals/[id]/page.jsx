// "use client";
// import Navbar from '@/components/Navbar';
// import { ProposalDashboard } from '@/components/ProposalDashboard'
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function Home(props) {
//   // In a real application, you might get this ID from the URL or user interaction
//   const router = useRouter();
//   let proposalId;

//   useEffect(()=>{
//     const { id } = router.query || {};
//     if(id){
//       proposalId = id;
//     }
//     console.log(proposalId);
//   },[router])

//   return (
//     (<main className="bg-gray-900 min-h-screen">
//       {/* <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}> */}
//         <Navbar />
//         <ProposalDashboard proposalId={proposalId} />
//     </main>)
//   );
// }

// "use client";

// import Navbar from "@/components/Navbar";
// import { ProposalDashboard } from "@/components/ProposalDashboard";
// import { useState, useEffect } from "react";

// export default function Home({ params }) {
//   const [proposalId, setProposalId] = useState(null);

//   useEffect(() => {
//     // Extract `id` from `params` and set the state
//     if (params && params.id) {
//       setProposalId(params.id);
//     }
//   }, [params]);

//   return (
//     <main className="bg-gray-900 min-h-screen">
//       <Navbar />
//       {/* Pass the proposalId once it's set */}
//       <ProposalDashboard proposalId={proposalId} />
//     </main>
//   );
// }

"use client";

import Navbar from "@/components/Navbar";
import { ProposalDashboard } from "@/components/ProposalDashboard";
import { useState, useEffect } from "react";

export default function Home({ params }) {
  const [proposalId, setProposalId] = useState(null);

  useEffect(() => {
    // Handle the params promise and extract the `id` property
    const fetchParams = async () => {
      const resolvedParams = await params;
      if (resolvedParams && resolvedParams.id) {
        setProposalId(resolvedParams.id);
      }
    };

    fetchParams();
  }, [params]);

  return (
    <main className="bg-gray-900 min-h-screen">
      <Navbar />
      {/* Render ProposalDashboard only when proposalId is available */}
      {proposalId ? (
        <ProposalDashboard proposalId={proposalId} />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
