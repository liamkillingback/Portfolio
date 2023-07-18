import React from "react";
import { blogPosts } from "../constants";
import { BlogCard } from "../components";
import { purpleLogo } from "../assets";
import { Helmet } from "react-helmet-async";

const BlogPage = () => {
  return (
    <>
    <Helmet>
      <title>Blog</title>
      <meta name="description" content="Liam Killingback's blog about anything web development and software." />
    </Helmet>
    <div className="sm:mx-[5%] px-5 bg-[rgba(0,0,0,0.5)] -z-10 rounded-2xl min-h-screen text-white pt-40">
    <div className="flex w-full items-center  p-5 justify-center mb-20">
      <img src={ purpleLogo } alt="" className="w-3/5" />
    </div>
      <div className="flex flex-wrap gap-10 pb-20 justify-center">
        {blogPosts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </div>
    </>
  );
};

export default BlogPage;
