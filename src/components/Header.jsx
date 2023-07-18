import React from "react";
import { profile } from "../assets";
import { Laptop } from ".";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";


const Header = () => {
  return (
    <div className=" h-screen flex flex-col items-center justify-center text-center px-[1%]">
      <motion.div variants={textVariant()} className="flex flex-col pb-20 px-5">
        <h1 className="font-black text-white lg:text-[120px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] ">
          <span className="text-[#915EFF] ">Liam</span> Killingback
        </h1>
        <h2 className="text-white text-2xl mt-10">Full-Stack Web Developer</h2>
      </motion.div>
      {/* <Laptop /> */}
      <div className="absolute xs:bottom-10 bottom-20 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#faf8f8] mb-1"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Header;
