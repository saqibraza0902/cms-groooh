"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const AnimatedText = () => {
  const words = ["Idea", "Buzz", "Breakthrough"]; // List of words to loop through
  const images = [
    "/icons/bulb-dynamic-premium.png", // Replace with actual paths to your images
    "/icons/hash-dynamic-premium.png",
    "/icons/rocket-dynamic-premium.png",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="w-full text-center">
      <p className="font-SuisseMedium relative z-40 w-full text-center lg:text-left text-3xl lg:text-4xl lg:leading-[60px]  xl:text-[60px] xl:leading-[80px] text-black uppercase">
        <p className="text-[1.5rem] lg:text-[2.3rem]">Innovate the Future: </p>
        <p>Your Next Big</p>{" "}
        <motion.p
          key={words[currentWordIndex]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-block font-SuisseBold"
        >
          {words[currentWordIndex]}
        </motion.p>{" "}
        <p> Stats Here</p>
      </p>
      <div className="lg:absolute z-50 lg:right-0 flex justify-center lg:bottom-[35%] 1.5xl:bottom-[40%] 1.5xl:right-[5%] 2xl:bottom-1/3 2xl:right-[5%]">
        <motion.div
          key={images[currentWordIndex]}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=""
        >
          <Image
            src={images[currentWordIndex]}
            alt=""
            width={210}
            height={210}
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedText;
