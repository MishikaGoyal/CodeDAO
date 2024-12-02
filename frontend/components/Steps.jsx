"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    title: "Submit Your Project",
    description:
      "Propose a new open-source idea or an enhancement to an existing tool.",
  },
  {
    title: "Community Voting",
    description: "Projects are reviewed and voted on by the DAO community.",
  },
  {
    title: "Get Funded",
    description: "Receive funding in crypto based on milestones and progress.",
  },
  {
    title: "Track Progress",
    description:
      "Integrate with GitHub to showcase progress with every commit or PR.",
  },
  {
    title: "Build the Future",
    description:
      "Innovate and deliver impactful solutions for the open-source ecosystem.",
  },
];

const StepsComponent = () => {
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
        } else {
          entry.target.classList.remove("opacity-100");
        }
      });
    });

    stepRefs.current.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex bg-black text-white" id="steps">
      <div className="text-white py-16 px-8 md:px-12 lg:px-16 max-w-full mt-32">
        <h2 className="abeezee-regular text-4xl md:text-5xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="ubuntu-bold-italic flex flex-col gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              ref={(el) => (stepRefs.current[index] = el)}
              className="flex items-center gap-6 md:gap-12 opacity-0 transition-opacity duration-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.3,
                ease: "easeOut",
              }}
            >
              {/* Step Number */}
              <motion.div
                className="bg-violet-300 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                {index + 1}
              </motion.div>

              {/* Step Details */}
              <div className="transition-all duration-700 opacity-100">
                <h3 className="text-2xl font-semibold">{step.title}</h3>
                <p className="text-gray-300 mt-2">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="mt-[300px] ml-[200px]">
        <Image
          src="/steps.gif"
          width={400}
          height={400}
          alt="steps"
          className="rounded-2xl mt-12"
        />
      </div>
    </div>
  );
};

export default StepsComponent;
