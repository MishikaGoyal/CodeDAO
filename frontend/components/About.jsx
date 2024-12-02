import React from "react";
import Image from "next/image";
function About() {
  return (
    <div className="w-full h-[300px] bg-black text-white" id="about">
      <div className=" flex mt-10">
        <h1 className=" abeezee-regular text-4xl ml-[100px] mt-8  font-bold absolute">
          About us
        </h1>
        <Image
          src="/about.gif"
          width={400}
          height={400}
          alt="coin"
          className="ml-10 mt-24 relative rounded-xl"
        ></Image>
        <div className="  tracking-in-expand w-[500px]  m-auto abeezee-regular ml-18 mt-20 relative">
          Welcome to CodeCatalyst, the revolutionary platform that redefines
          open-source funding and development. We believe in empowering
          developers and creators to build the future of technology
          collaboratively and transparently. With a DAO-driven selection
          process, we provide funding for both innovative new projects and
          enhancements to existing open-source tools. Our unique integration
          with GitHub ensures milestone-based crypto payments for every commit
          or pull request, rewarding real progress and accountability. At
          CodeCatalyst, we’re not just supporting open source—we’re transforming
          how it evolves. Join us to innovate, fund, and shape the technology of
          tomorrow.
        </div>
      </div>
    </div>
  );
}

export default About;
