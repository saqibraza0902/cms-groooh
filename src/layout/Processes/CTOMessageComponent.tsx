import React from "react";
import ScrollTextSection from "../Home/ScrollTextSection";
import ParagraphComponent from "@/ui/components/ScrollText";

const CTOMessageComponent = () => {
  return (
    <div className="flex flex-col gap-10 items-center lg:flex-row">
      <div className="lg:w-3/12 space-y-3">
        <div className="h-40 w-32 bg-gray-500" />
        <div className="flex flex-col">
          <span className="font-Suisse">John Doe</span>
          <span className="text-sm text-brand_pink-200">CTO at *****</span>
        </div>
      </div>
      <div className="lg:w-9/12 space-y-5">
        <ParagraphComponent
          className="!text-3xl"
          text="Client, their needs, desires, pain points, preferences, and feedback are the heart of our process. Throughout the project lifecycle, we measure our success by your satisfaction"
        />
        <p className="text-lg text-brand_pink-200">
          Whether its an early-stage startup or a complex long-term project, we
          look forward to building a team of talented specialists that will
          breathe life into your ideas.
        </p>
      </div>
    </div>
  );
};

export default CTOMessageComponent;
