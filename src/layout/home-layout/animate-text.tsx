"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface IProp {
  words: string[];
  images: string[];
  statictext: string[];
}

const AnimatedText = ({ words, images, statictext }: IProp) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [words?.length]);

  return (
    <div className="w-full text-center">
      <p className="font-SuisseMedium relative z-40 w-full text-center lg:text-left text-3xl lg:text-4xl lg:leading-[60px]  xl:text-[60px] xl:leading-[80px] text-black uppercase">
        <p className="text-[1.5rem] lg:text-[2.3rem]">{statictext[0]}</p>
        <p>{statictext[1]}</p>{" "}
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
        <p>{statictext[2]}</p>
      </p>
      <div className="lg:absolute z-50 lg:right-0 flex justify-center lg:bottom-[35%] 1.5xl:bottom-[40%] 1.5xl:right-[1%] 2xl:bottom-1/3 2xl:right-0">
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
            unoptimized
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
