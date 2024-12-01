import Head from "next/head";
import PulsatingNodes from "./Components/Hero";
import About from "./Components/About";
import StepsComponent from "./Components/Steps";
import { AnimatedTestimonialsDemo } from "./Components/Showcase";
import Footer from "./Components/Footer";

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
      <PulsatingNodes />
      <About />
      <StepsComponent />
      <AnimatedTestimonialsDemo />
      <Footer />
    </>
  );
}
