"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProjectProposalForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    githubRepo: "",
    projectDomain: "",
    fundingRequested: "",
    skills: [],
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const projectDomains = [
    "Web Development",
    "Machine Learning",
    "Blockchain",
    "Mobile App",
    "Data Science",
    "DevOps",
    "Cybersecurity",
    "Other",
  ];

  const validateStep = () => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title.trim())
          newErrors.title = "Project title is required";
        if (!formData.description.trim())
          newErrors.description = "Project description is required";
        break;
      case 2:
        if (!formData.githubRepo.trim())
          newErrors.githubRepo = "GitHub repository link is required";
        if (!formData.projectDomain)
          newErrors.projectDomain = "Project domain is required";
        break;
      case 3:
        const funding = parseFloat(formData.fundingRequested);
        if (isNaN(funding) || funding <= 0 || funding > 10) {
          newErrors.fundingRequested = "Funding must be between 0.1 and 10 ETH";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      console.log("Project Proposal Submitted:", formData);
    }
  };

  const handleSelectChange = (value) => {
    setFormData((prevProject) => ({
      ...prevProject,
      projectDomain: value,
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-0.2s">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="Enter your project title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[150px] transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <Button
                onClick={handleNextStep}
                className="transition-all duration-500 transform hover:scale-105"
              >
                Next: Repository Details
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-0.3s">
            <div>
              <Label htmlFor="githubRepo">GitHub Repository</Label>
              <Input
                id="githubRepo"
                placeholder="https://github.com/username/repository"
                value={formData.githubRepo}
                onChange={(e) =>
                  setFormData({ ...formData, githubRepo: e.target.value })
                }
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.githubRepo && (
                <p className="text-red-500 text-sm">{errors.githubRepo}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="projectDomain"
                className="block text-sm font-medium text-gray-700"
              >
                Project Domain
              </label>
              <select
                id="projectDomain"
                name="projectDomain"
                value={formData.projectDomain}
                onChange={(e) => handleSelectChange(e.target.value)}
                className="block w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              >
                <option value="" disabled>
                  Select a project domain
                </option>
                {projectDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>

              {errors.projectDomain && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.projectDomain}
                </p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                className="transition-all duration-300 hover:bg-gray-100"
              >
                Previous
              </Button>
              <Button
                onClick={handleNextStep}
                className="transition-all duration-500 transform hover:scale-105"
              >
                Next: Funding
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate__animated animate__fadeIn animate__delay-0.4s">
            <div>
              <Label htmlFor="fundingRequested">Funding Requested (ETH)</Label>
              <Input
                id="fundingRequested"
                type="number"
                step="0.1"
                min="0.1"
                max="10"
                placeholder="Amount of funding needed (max 10 ETH)"
                value={formData.fundingRequested}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fundingRequested: e.target.value,
                  })
                }
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.fundingRequested && (
                <p className="text-red-500 text-sm">
                  {errors.fundingRequested}
                </p>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-700">Funding Guidelines</h3>
              <ul className="list-disc list-inside text-yellow-800 text-sm">
                <li>Maximum funding: 10 ETH per project</li>
                <li>Funding will be released in milestone-based increments</li>
                <li>Proposals are voted on by DAO members</li>
                <li>Transparent reporting and GitHub tracking required</li>
              </ul>
            </div>

            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                className="transition-all duration-300 hover:bg-gray-100"
              >
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                className="transition-all duration-500 transform hover:scale-105"
              >
                Submit Proposal
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className=" abeezee-regular w-full max-w-2xl mx-auto hover:scale-105 transition-all duration-500 ease-in-out">
      <CardHeader>
        <CardTitle>Submit Your Project Proposal</CardTitle>
        <CardDescription className="tracking-in-expand">
          Submit your open-source project for funding and community support
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2 mb-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  step === num ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          {renderStep()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectProposalForm;
