"use client";

import { useProposalData } from '../hooks/useProposalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Github, FileText, DollarSign, Vote, User, GitPullRequest } from 'lucide-react'
import dynamic from 'next/dynamic';
import { proposals } from './constants';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export function ProposalDashboard({
  proposalId
}) {

  const proposal = proposals.filter((proposal) => proposal.id === parseInt(proposalId))[0];
  if (!proposal) {
    return <div className="flex items-center justify-center h-screen">Proposal not found</div>;
  }

  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const votesForPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0;

  const milestoneChartOptions = {
    chart: {
      type: "bar",
      height: 300,
      background: 'transparent',
      foreColor: '#D1D5DB',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: proposal.milestones.map(m => `Milestone ${m.id}`),
    },
    yaxis: {
      title: {
        text: 'Funding Amount (ETH)',
      },
    },
    colors: ['#FBBF24'],
    tooltip: {
      theme: 'dark',
    },
  };

  const milestoneChartSeries = [
    {
      name: 'Funding Amount',
      data: proposal.milestones.map(m => m.fundingAmount),
    },
  ];

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <Card className="bg-gray-800 border-t-4 border-blue-500 mb-8 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl text-blue-300">{proposal.title}</CardTitle>
            <Badge
              variant={proposal.status === 'Active' ? 'default' : 'secondary'}
              className="text-lg">
              {proposal.status}
            </Badge>
          </div>
          <CardDescription className="text-gray-300 text-lg">{proposal.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center text-blue-300">
              <Github className="mr-2" />
              <a
                href={proposal.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline">
                GitHub Repository
              </a>
            </div>
            <div className="flex items-center text-green-300">
              <FileText className="mr-2" />
              <span>Domain: {proposal.projectDomain}</span>
            </div>
            <div className="flex items-center text-yellow-300">
              <DollarSign className="mr-2" />
              <span>Funding Requested: {proposal.fundingRequested} ETH</span>
            </div>
            <div className="flex items-center text-purple-300">
              <Vote className="mr-2" />
              <span>Cycle: {proposal.cycle}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-800 border-t-4 border-green-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-green-300">Voting Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-center">{votesForPercentage.toFixed(2)}% Approval</div>
              <Progress value={votesForPercentage} className="w-full h-4" />
              <div className="flex justify-between text-sm">
                <span className="text-green-400">For: {proposal.votesFor}</span>
                <span className="text-red-400">Against: {proposal.votesAgainst}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-t-4 border-purple-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-300">Proposer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="mr-2 text-purple-300" />
                <span className="font-mono text-lg">{proposal.proposer.address}</span>
              </div>
              <div className="flex items-center">
                <Github className="mr-2 text-purple-300" />
                <a
                  href={proposal.proposer.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline">
                  {proposal.proposer.githubUsername}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-gray-800 border-t-4 border-yellow-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-300">Milestones Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Chart
                options={milestoneChartOptions}
                series={milestoneChartSeries}
                type="bar"
                height={300} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-t-4 border-blue-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-300">Recent Pull Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md">
              {proposal.recentPullRequests.map((pr) => (
                <PullRequestItem key={pr.id} pullRequest={pr} />
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-gray-800 border-t-4 border-blue-500 shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-300">Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border border-gray-700 p-4">
            {proposal.milestones.map((milestone, index) => (
              <div key={milestone.id}>
                <MilestoneCard milestone={milestone} />
                {index < proposal.milestones.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>)
  );
}

function MilestoneCard({
  milestone
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-500';
      case 'InProgress': return 'bg-yellow-500';
      case 'Submitted': return 'bg-blue-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    (<div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-300">Milestone #{milestone.id}</h3>
        <Badge
          variant="outline"
          className={`${getStatusColor(milestone.status)} text-white`}>
          {milestone.status}
        </Badge>
      </div>
      <p className="text-gray-300">{milestone.description}</p>
      <p className="text-sm text-yellow-300">Funding Amount: {milestone.fundingAmount} ETH</p>
    </div>)
  );
}

function PullRequestItem({
  pullRequest
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'merged': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    (<div className="flex items-center space-x-4 py-2">
      <GitPullRequest className={`${getStatusColor(pullRequest.status)}`} />
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-200">{pullRequest.title}</p>
        <p className="text-xs text-gray-400">
          #{pullRequest.id} by {pullRequest.author} on {new Date(pullRequest.createdAt).toLocaleDateString()}
        </p>
      </div>
      <Badge variant="outline" className={`${getStatusColor(pullRequest.status)}`}>
        {pullRequest.status}
      </Badge>
    </div>)
  );
}

