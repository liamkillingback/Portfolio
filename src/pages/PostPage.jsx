import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { Navbar } from "../components";
import { blogPosts } from "../constants";

const PostPage = () => {
    const [mdText, setMdText] = useState("");

    const re = new RegExp("blog/.+");
    const address = window.location.href;
    const page = address.match(re);
    const mdFileName = page[0].slice(5);

    const blogItem = blogPosts.find(element => element.title === mdFileName)
    

  useEffect(() => {
    import(`../markdown/${mdFileName}.md`).then((res) => {
      fetch(res.default)
        .then((res) => res.text())
        .then((res) => setMdText(res));
    });
  }, []);
  return (
    <>
    <Navbar />
    <div className=" pt-[6rem] sans flex pb-20 text-black justify-center ">
      <div className="w-screen flex sm:pl-20 sm:pr-20 sm:w-3/5 flex-col bg-[#ffffff] pb-10 items-center text-xl text-left pl-10 pr-10 rounded-3xl">
        <h1 className="md:text-2xl lg:text-4xl text-center font-bold font-mono rounded-t-3xl p-2  w-full">
          {mdFileName}
        </h1>
        <hr className="w-4/5 mb-4" />
        <img className="flex p-2 lg:w-3/5 w-4/5" src={blogItem.img} alt="" />
        <ReactMarkdown
          children={mdText}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={atomDark}
                  language={match[1]}
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        ></ReactMarkdown>
      </div>
    </div>

    </>
  );
};

export default PostPage;
