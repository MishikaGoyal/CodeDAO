// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Wallet, TrendingUp, DollarSign, PieChart } from 'lucide-react'

// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Progress } from "@/components/ui/progress"

// export function ContributionOverview() {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [expandedWidget, setExpandedWidget] = useState(null)

//   const widgets = [
//     {
//       id: "total-contributed",
//       title: "Total Contributed",
//       value: "$10,000",
//       icon: <Wallet className="w-6 h-6 text-purple-400" />,
//       color: "from-purple-500 to-blue-500",
//     },
//     {
//       id: "dao-balance",
//       title: "DAO Fund Balance",
//       value: "$250,000",
//       icon: <TrendingUp className="w-6 h-6 text-green-400" />,
//       color: "from-green-500 to-teal-500",
//     },
//     {
//       id: "fundraising-goal",
//       title: "Fundraising Goal",
//       value: "75%",
//       icon: <PieChart className="w-6 h-6 text-blue-400" />,
//       color: "from-blue-500 to-indigo-500",
//     },
//   ]

//   return (
//     (<div className="space-y-8">
//       <h2 className="text-3xl font-bold text-center text-blue-300">Contribution Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {widgets.map((widget) => (
//           <motion.div
//             key={widget.id}
//             className={`p-6 rounded-lg bg-gradient-to-br ${widget.color} shadow-lg cursor-pointer`}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setExpandedWidget(widget.id)}>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
//                 <p className="text-2xl font-bold">{widget.value}</p>
//               </div>
//               {widget.icon}
//             </div>
//             {expandedWidget === widget.id && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: "auto" }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="mt-4">
//                 <p className="text-sm">Transaction History:</p>
//                 <ul className="text-sm mt-2">
//                   <li>2023-05-15: +$1,000</li>
//                   <li>2023-04-22: +$2,500</li>
//                   <li>2023-03-10: +$6,500</li>
//                 </ul>
//               </motion.div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//       <div className="flex justify-center">
//         <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <DialogTrigger asChild>
//             <Button
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center">
//               <DollarSign className="w-5 h-5 mr-2" />
//               Contribute More
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="bg-gray-800 text-white">
//             <DialogHeader>
//               <DialogTitle>Connect Wallet & Contribute</DialogTitle>
//               <DialogDescription>
//                 Connect your wallet to contribute more funds to the DAO.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="flex justify-center space-x-4">
//               <Button variant="outline">Connect MetaMask</Button>
//               <Button variant="outline">Connect WalletConnect</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>
//       <div className="max-w-md mx-auto">
//         <h3 className="text-xl font-semibold mb-2 text-center">DAO Fundraising Progress</h3>
//         <Progress
//           value={75}
//           className="h-4 bg-gray-700"
//           indicatorclassname="bg-gradient-to-r from-blue-500 to-purple-500" />
//         <p className="text-center mt-2 text-blue-300">DAO is 75% to its $500,000 goal!</p>
//       </div>
//     </div>)
//   );
// }


import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Wallet, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  GitMerge, 
  Users, 
  Award, 
  Clock, 
  Zap 
} from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ContributionOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedWidget, setExpandedWidget] = useState(null)

  const widgets = [
    {
      id: "total-contributed",
      title: "Total Contributed",
      value: "$10,000",
      icon: <Wallet className="w-6 h-6 text-purple-400" />,
      color: "from-purple-500 to-blue-500",
      details: [
        { label: "Unique Contributors", value: "42" },
        { label: "Average Contribution", value: "$238" }
      ]
    },
    {
      id: "dao-balance",
      title: "DAO Fund Balance",
      value: "$250,000",
      icon: <TrendingUp className="w-6 h-6 text-green-400" />,
      color: "from-green-500 to-teal-500",
      details: [
        { label: "Active Projects", value: "12" },
        { label: "Funds Allocated", value: "$175,000" }
      ]
    },
    {
      id: "fundraising-goal",
      title: "Fundraising Goal",
      value: "75%",
      icon: <PieChart className="w-6 h-6 text-blue-400" />,
      color: "from-blue-500 to-indigo-500",
      details: [
        { label: "Goal", value: "$500,000" },
        { label: "Remaining", value: "$125,000" }
      ]
    }
  ]

  const activeProjects = [
    {
      name: "AI Open Source Library",
      progress: 65,
      contributors: 8,
      totalFunding: "$45,000",
      milestones: [
        { name: "Core Architecture", completed: true },
        { name: "Machine Learning Integration", completed: false },
        { name: "Documentation", completed: false }
      ]
    },
    {
      name: "Decentralized Development Platform",
      progress: 40,
      contributors: 5,
      totalFunding: "$35,000",
      milestones: [
        { name: "Initial Design", completed: true },
        { name: "Smart Contract Development", completed: false },
        { name: "Frontend Prototype", completed: false }
      ]
    }
  ]

  return (
    <div className="space-y-8 bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold text-center text-blue-300 mb-10">
        CodeDAO: Transparent Open Source Funding
      </h2>

      {/* Contribution Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {widgets.map((widget) => (
          <motion.div
            key={widget.id}
            className={`p-6 rounded-lg bg-gradient-to-br ${widget.color} shadow-lg cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setExpandedWidget(expandedWidget === widget.id ? null : widget.id)}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{widget.title}</h3>
                <p className="text-2xl font-bold">{widget.value}</p>
              </div>
              {widget.icon}
            </div>
            {expandedWidget === widget.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2">
                {widget.details.map((detail, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{detail.label}</span>
                    <span className="font-bold">{detail.value}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Active Projects Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center text-blue-300">
          Active Open Source Projects
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {activeProjects.map((project, index) => (
            <Card key={index} className="bg-gray-800 border-none">
              <CardHeader>
                <CardTitle className="text-xl text-blue-300">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-white">
                    <span>Project Progress</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <Progress 
                    value={project.progress} 
                    className="h-2 bg-gray-700" 
                    indicatorclassname="bg-gradient-to-r from-blue-300 to-purple-500" 
                  />
                  <div className="grid grid-cols-2 gap-2 text-sm text-white">
                    <div>
                      <Users className="w-4 h-4 inline mr-2" />
                      {project.contributors} Contributors
                    </div>
                    <div>
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      {project.totalFunding} Funded
                    </div>
                  </div>
                  <div>
                    <h4 className="text-md font-semibold mb-2">Project Milestones</h4>
                    {project.milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className="flex items-center space-x-2 mb-1 text-white">
                        {milestone.completed ? (
                          <Zap className="w-4 h-4 text-white-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-yellow-400" />
                        )}
                        <span className={milestone.completed ? "line-through text-white" : ""}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contribution Modal and Progress */}
      <div className="space-y-6">
        <div className="flex justify-center">
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Contribute to Open Source
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Connect Wallet & Contribute</DialogTitle>
                <DialogDescription>
                  Support innovative open-source projects directly through blockchain
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center space-x-4">
                <Button variant="outline">Connect MetaMask</Button>
                <Button variant="outline">Connect WalletConnect</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="max-w-md mx-auto">
          <h3 className="text-xl text-white font-semibold mb-2 text-center">
            Overall DAO Fundraising Progress
          </h3>
          <Progress
            value={75}
            className="h-4 bg-gray-700"
            indicatorclassname="bg-gradient-to-r from-blue-300 to-purple-500" 
          />
          <p className="text-center mt-2 text-blue-300">
            CodeDAO is 75% towards its $500,000 goal!
          </p>
        </div>
      </div>
    </div>
  )
}