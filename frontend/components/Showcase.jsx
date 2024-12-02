"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
// Dynamically import the AnimatedTestimonials component with SSR disabled
const AnimatedTestimonials = dynamic(
  () =>
    import("@/components/ui/animated-testimonials").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export function AnimatedTestimonialsDemo() {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 5000; // Auto-rotate every 5 seconds

  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/1.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/2.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "/3.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "/4.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "/5.jpg",
    },
  ];

  useEffect(() => {
    setIsClient(true);

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, intervalTime);

    return () => clearInterval(timer); // Clear the timer when the component unmounts
  }, [testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      {/* Pass the current testimonial */}
      <AnimatedTestimonials testimonials={[testimonials[currentIndex]]} />

      {/* Buttons */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-4">
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          onClick={handlePrev}
        >
          <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
        </button>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
          onClick={handleNext}
        >
          <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
