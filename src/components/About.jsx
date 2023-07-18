import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import { services, languages } from "../constants";
import Tilt from "react-tilt";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="sm:w-[250px] w-full ">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[10px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#180733] rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const Languages = ({ index, name, icon, description }) => (
  <Tilt className="w-[150px]  max-h-[152px] hover:max-h-[300px] transition overflow-hidden">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full hover:h-full violet-gradient p-[1px] rounded-[10px] shadow-card "
    >
      <div className="bg-[#180733] rounded-[20px] py-5 px-12 min-h-[150px] flex justify-evenly items-center flex-col">
        <img src={icon} alt="" className="w-12" />
        <p className="text-center text-white">{name}</p>
      </div>
      <p className="tight z-40 text-[15px] text-black rounded-[10px] p-1  space-x-0 leading-tight">
        {description}
      </p>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [mobile, setMobile] = useState(true)
  useMemo(() => {
    console.log(window.innerWidth)
    if (window.innerWidth < 400) {
      setMobile(true)
    }
    else setMobile(false)
  
  }, [])
  
  return (
    <motion.section
      variants={staggerContainer()}
      initial={mobile ? "" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      id="about"
      className="min-h-screen z-50 py-5"
    >
      <motion.p className="text-[#9c9999]">INTRODUCTION</motion.p>
      <motion.p
        variants={fadeIn("left", "", 0.3, 3)}
        className="text-white w-full  text-start text-[3rem]"
      >
        Overview.
      </motion.p>
      <motion.p
        variants={fadeIn("right", "", 0.5, 4)}
        className="mt-4 text-white sm:text-[17px] text-[13px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in Javascript, Python,
        C/C++, Rust, CSS + tailwind, also have expertise in the MERN stack, and
        django. I create efficient, scalable, and user-friendly solutions that
        solve real-world problems. Let's work together to bring your ideas to
        life!
      </motion.p>
      <div className="flex flex-wrap gap-10 mt-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
      <motion.p className="mt-10 text-white text-[3rem]">
        Technologies.
      </motion.p>
      <motion.p className="mt-10 text-white text-[1rem]">
        Hover for more info!
      </motion.p>
      <div className="flex flex-wrap gap-5 mt-10">
        {languages.map((language, index) => (
          <Languages key={index} index={index} {...language} />
        ))}
      </div>
    </motion.section>
  );
};

export default About;
