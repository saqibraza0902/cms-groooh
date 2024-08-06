"use client";
import { cn } from "@/utils/styles";
/* eslint-disable react-hooks/rules-of-hooks */
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef } from "react";
const Content =
  "For a decade in Pakistan, honing our Design & Development skills. We endeavor to support ambitious clients in their pursuit of perfection. Success, we believe, is a collaborative effort. let's join forces to reach the pinnacle together!";

interface IProp {
  text: string;
  className?: string;
}
const ParagraphComponent = ({ text, className }: IProp) => {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.8", "start 0.2"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={element}
      className={cn(
        "flex flex-wrap leading-7 md:leading-10 font-semibold md:text-4xl text-xl",
        className
      )}
    >
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = start + 1 / words.length;
        const char = word.split("");
        const amount = end - start;
        const step = amount / char.length;
        return (
          <span key={idx} className={`mr-2 lg:mt-2`}>
            {char.map((ch, idx) => {
              const cstart = start + step * idx;
              const cend = start + step * (idx + 1);
              const opacity = useTransform(
                scrollYProgress,
                [cstart, cend],
                [0, 1]
              );

              return (
                <span className="relative" key={idx}>
                  <span className="absolute opacity-30">{ch}</span>
                  <motion.span
                    key={idx}
                    style={{ opacity }}
                    transition={{ duration: 2 }}
                  >
                    {ch}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default ParagraphComponent;
