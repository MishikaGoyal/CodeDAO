"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Dynamically import the AnimatedTestimonials component with SSR disabled
const AnimatedTestimonials = dynamic(
  () =>
    import("@/components/ui/animated-testimonials").then((mod) => mod.default), // Access the default export
  {
    ssr: false, // Disable SSR for this component
  }
);

export function AnimatedTestimonialsDemo() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark the component as client-side rendered
    setIsClient(true);
  }, []);

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

  // Prevent rendering until client-side
  if (!isClient) {
    return <div>Loading...</div>; // Optionally, display a loading spinner/message
  }

  return <AnimatedTestimonials testimonials={testimonials} />;
}
