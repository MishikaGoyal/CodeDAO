"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import React, { useEffect, useRef } from "react";

const PulsatingNodes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");

    // Set canvas size and scaling for high-DPI screens
    const setCanvasSize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = 400 * 2; // Limit canvas height to match the hero section
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `400px`;
    };
    setCanvasSize();

    // Adjust canvas size on window resize
    window.addEventListener("resize", setCanvasSize);

    const r = () => Math.random();

    let mx = canvas.width / 2;
    let my = canvas.height / 2;

    window.onpointermove = (e) => {
      mx = e.clientX * 2;
      my = e.clientY * 2;
    };

    function dot() {
      let radius = 100 + Math.random() * 300;
      let size = 2 + r() * r() * 60;
      let halfSize = size / 2;
      let doubleSize = size * 2;

      let x = r() * (canvas.width + size) - halfSize;
      let y = r() * (canvas.height + size) - halfSize;
      let anchorX = x;
      let anchorY = y;

      let cx = 0;
      let cy = 0;

      let vy = 1 + r() * (size / 10);

      let mode = 0;

      return () => {
        anchorY += vy;
        if (anchorY > canvas.height + doubleSize) {
          anchorY = -doubleSize;
        }
        const dx = anchorX - mx;
        const dy = anchorY - my;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const clampedRad = Math.max(0, radius - distance);

        const theta = Math.atan2(dy, dx);
        cx += clampedRad * Math.cos(theta) - cx;
        cy += clampedRad * Math.sin(theta) - cy;

        let col = `rgba(255, 255, 255, ${(radius / distance) * 0.25})`;

        if (r() < 0.0001) {
          mode = 1;
          vy *= 4;
        }
        if (mode < 200 && mode > 0) {
          if (mode < 4) {
            c.fillStyle = "rgba(0, 245, 155, 1)";
            c.fillRect(
              anchorX + cx - size / 2,
              anchorY + cy - size / 2,
              size * 2,
              size * 2
            );
          }
          col = `rgba(0, 245, 255, 1)`;
          mode++;
          if (r() < 0.01 || mode > 190) {
            mode = 0;
            vy /= 4;
          }
        }

        c.fillStyle = col;
        c.fillRect(anchorX + cx, anchorY + cy, size, size);
      };
    }

    let dots = [];
    for (let i = 0; i < 1000; i++) {
      dots.push(dot());
    }

    const draw = () => {
      c.fillStyle = `rgba(0, 0, 0, .25)`;
      c.fillRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => d());
      requestAnimationFrame(draw);
    };

    draw();

    // Clean up on unmount
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px]">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ display: "block" }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10">
        <h1 className=" ga-maamli-regular text-4xl md:text-6xl font-bold text-white text-center glow-text">
          Empowering Open Source with DAO
        </h1>
        <p className="mt-4 text-lg md:text-xl text-blue-200 text-center">
          Innovate, Fund, and Build the Future of Technology
        </p>
        <div className="mt-8 flex space-x-4">
          <HoverBorderGradient>Apply for funding </HoverBorderGradient>

          <HoverBorderGradient>Join DAO </HoverBorderGradient>
        </div>
      </div>
    </div>
  );
};

export default PulsatingNodes;
