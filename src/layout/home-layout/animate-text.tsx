"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const AnimatedText = () => {
  const words = ["Breakthrough", "Buzz", "Idea"]; // List of words to loop through
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
    <div>
      <p className="font-SuisseMedium relative z-40 w-full text-center lg:text-left text-3xl lg:text-6xl  xl:text-[60px] lg:leading-[80px] text-black uppercase">
        <p className="text-[2.3rem]">Innovate the Future: </p>
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
      <div className="absolute right-0 bottom-32">
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