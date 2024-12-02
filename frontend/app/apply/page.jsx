import ProjectProposalForm from "@/components/Form";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
    return (
        (<div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            <div className="flex flex-col h-screen justify-center items-center">
                <ProjectProposalForm />
            </div>
        </div>)
    );
}

// "use client";
  
// import { useCallback } from "react";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";
// import ProjectProposalForm from "@/components/Form";
// import Navbar from "@/components/Navbar";

// export default function Dashboard() {
//     const particlesInit = useCallback(async (engine) => {
//         // Load the tsParticles package
//         await loadFull(engine);
//     }, []);

//     return (
//         <div className="relative min-h-screen bg-gray-900 text-white">
//             {/* Particle Background */}
//             <Particles
//                 id="tsparticles"
//                 init={particlesInit}
//                 options={{
//                     background: {
//                         color: {
//                             value: "#000000",
//                         },
//                     },
//                     fpsLimit: 60,
//                     interactivity: {
//                         events: {
//                             onHover: {
//                                 enable: true,
//                                 mode: "repulse",
//                             },
//                             onClick: {
//                                 enable: true,
//                                 mode: "push",
//                             },
//                         },
//                         modes: {
//                             repulse: {
//                                 distance: 100,
//                                 duration: 0.4,
//                             },
//                             push: {
//                                 quantity: 4,
//                             },
//                         },
//                     },
//                     particles: {
//                         color: {
//                             value: "#ffffff",
//                         },
//                         links: {
//                             color: "#ffffff",
//                             distance: 150,
//                             enable: true,
//                             opacity: 0.5,
//                             width: 1,
//                         },
//                         collisions: {
//                             enable: true,
//                         },
//                         move: {
//                             directions: "none",
//                             enable: true,
//                             outModes: {
//                                 default: "bounce",
//                             },
//                             random: false,
//                             speed: 2,
//                             straight: false,
//                         },
//                         number: {
//                             density: {
//                                 enable: true,
//                                 area: 800,
//                             },
//                             value: 80,
//                         },
//                         opacity: {
//                             value: 0.5,
//                         },
//                         shape: {
//                             type: "circle",
//                         },
//                         size: {
//                             value: { min: 1, max: 5 },
//                         },
//                     },
//                     detectRetina: true,
//                 }}
//                 className="absolute top-0 left-0 w-full h-full z-0"
//             />
//             {/* Content */}
//             <div className="relative z-10">
//                 <Navbar />
//                 <div className="flex flex-col h-screen justify-center items-center">
//                     <ProjectProposalForm />
//                 </div>
//             </div>
//         </div>
//     );
// }
