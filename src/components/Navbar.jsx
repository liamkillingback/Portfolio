import React, { useState, useEffect } from "react";
import { Navlinks } from "../constants";
import { instagram, logo, menu } from "../assets";
import { NavHashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`text-[1.5rem] z-50 flex ${scrolled && 'navbar'} lg:justify-center flex-col fixed w-full h-[6rem]`}>
        <nav className="  flex-row flex lg:justify-between justify-evenly xl:justify-evenly">
          {/* Regular */}
          <NavHashLink to="/" className="h-full text-[#915EFF] flex p-2 items-center">
            <h1 className="font-mono">Liam_Killingback</h1>
          </NavHashLink>

          <div className="flex-row hidden lg:flex  ">
            <div className="flex items-center ">
              {Navlinks.map((link, index) => (
                <NavHashLink
                  key={index}
                  to={link.href}
                  className="flex mx-5 text-[#f3f0f0] hover:text-[#915EFF] transition-all"
                >
                  {link.title}
                </NavHashLink>
              ))}
              
              <a
                className="mr-2"
                target="_blank"
                href="https://www.instagram.com/liamkillingback/"
              >
                <img className="w-10" src={instagram} alt="" />
              </a>
            </div>
          </div>
          <img
            className="lg:hidden w-9 cursor-pointer"
            onClick={() => setMobile(!mobile)}
            src={menu}
            alt=""
          />
        </nav>

        {/* Mobile */}

        <div className={`lg:hidden  ${!mobile && "hidden"} flex justify-end transition-all ease-out duration-700`}>
          <div className="menu flex items-end w-full  text-left p-2 flex-col">
            {Navlinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex mx-5 py-2 px-2 rounded-lg w-full text-[#a09898] justify-end hover:bg-[#19123a] hover:text-[#e4e3e9] transition-all"
              >
                {link.title}
              </a>
            ))}
            <a
              className="mr-6"
              target="_blank"
              href="https://www.instagram.com/liamkillingback/"
            >
              <img className="w-10" src={instagram} alt="" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
