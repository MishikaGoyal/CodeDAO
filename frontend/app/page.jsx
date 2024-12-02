import Head from "next/head";
import PulsatingNodes from "@/components/Hero";
import About from "@/components/About";
import StepsComponent from "@/components/Steps";
import { AnimatedTestimonialsDemo } from "@/components/Showcase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Open Source DAO</title>
        <meta
          name="description"
          content="Empowering Open Source Projects with DAO."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <PulsatingNodes />
      <About />
      <StepsComponent />
      <AnimatedTestimonialsDemo />
      <Footer />
    </>
  );
}

