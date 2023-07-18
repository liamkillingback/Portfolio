import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import Tilt from "react-tilt";

const BlogCard = ({ title, img, description, publishedAt, index }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleClick = () => {
    // dispatch(setArticle({ ...props }));
    navigate(`/blog/${title}`);
  };
  return (
    <>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className=" p-[2px] violet-gradient rounded-2xl h-full sm:w-[360px] w-full"
      >
        <motion.div
          variants={fadeIn("up", "spring", index * 0.5, 0.75)}
          onClick={handleClick}
          className="cursor-pointer p-1 bg-[#180733] card z-[100] relative rounded-xl"
        >
          <div>
            <img
              src={img}
              alt="project_image"
              className="w-full max-h-60 rounded-2xl"
            />

            <div className="absolute inset-0 flex justify-end m-3 card-img_hover"></div>
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{title}</h3>
            <div className="mt-2 text-gray-400 tight text-[16px]">
              {description}
            </div>
            <div className="mt-2 text-gray-600 tight text-[16px]">
              {publishedAt}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2"></div>
        </motion.div>
      </Tilt>
    </>
  );
};

export default BlogCard;
