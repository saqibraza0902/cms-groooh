import React from "react";
import HeroComponent from "./HeroComponent";
import CTOMessageComponent from "./CTOMessageComponent";
import ProcessesDetailsSection from "./ProcessDetailsComponent";

const ProcessesLayout = () => {
  return (
    <div>
      <section>
        <HeroComponent
          title={"Dedicated team services"}
          image={"/raw/cms-dev-1-1.webp"}
        />
      </section>
      <section className="h-full bg-brand_blue-300 2xl:h-screen flex flex-col lg:flex-row  w-full lg:px-20 py-10">
        <ProcessesDetailsSection />
      </section>
      <section className="mx-12 py-10 h-screen flex items-center">
        <CTOMessageComponent />
      </section>
    </div>
  );
};

export default ProcessesLayout;
