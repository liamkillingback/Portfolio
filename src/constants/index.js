import {
  engineer,
  contentCreator,
  mern,
  reactlogo,
  django,
  html,
  css,
  javascript,
  python,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  threejs,
  git,
  rust,
  c,
  japaneasy,
  Diary,
  Wallpaper,
  Harry,
  Electrics,
  newsVid,
  aiImages,
  eCom,
} from "../assets";

export const Navlinks = [
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export const services = [
  {
    title: "React Developer",
    icon: reactlogo,
  },
  {
    title: "Django",
    icon: django,
  },
  {
    title: "Full-stack Developer",
    icon: mern,
  },
  {
    title: "Content Creator",
    icon: contentCreator,
  },
  {
    title: "Software Engineer",
    icon: engineer,
  },
];

export const languages = [
  {
    name: "JavaScript",
    icon: javascript,
    description: "Most familiar language and mostly used with react",
  },
  {
    name: "HTML 5",
    icon: html,
    description:
      "Solid understanding, and have used a lot with react + django projects",
  },
  {
    name: "CSS 3",
    icon: css,
    description: "Confident",
  },
  {
    name: "Python",
    icon: python,
    description: "Good understanding and have had fun creating many projects! ",
  },
  {
    name: "Rust",
    icon: rust,
    description: "Just started learning and is really interesting!",
  },
  {
    name: "C/C++",
    icon: c,
    description:
      "Have done a fair bit with C/C++ during my harvard courses and some small personal projects",
  },
  {
    name: "React JS",
    icon: reactjs,
    description: "Most comfortable with, by far my favourite framework",
  },
  {
    name: "Redux Toolkit",
    icon: redux,
    description:
      "Love utilizing this tool, along with redux-persist it makes a great combo",
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
    description: "Recently converted to tailwind with all my projects!",
  },
  {
    name: "Node JS",
    icon: nodejs,
    description:
      "Sound understanding utilizing as part of the MERN stack with express",
  },
  {
    name: "MongoDB",
    icon: mongodb,
    description: "My go-to database, used in node with the mongoose library",
  },
  {
    name: "Three JS",
    icon: threejs,
    description:
      "Top pick for using models and animations as well as framer-motion",
  },
  {
    name: "git",
    icon: git,
    description: "Use for source control and repositories",
  },
];

export const projects = [
  {
    name: "Japanezy - Japanese language learning app",
    description:
      "My current work in progress, Currently only learning is available and is freely hosted on on-render so may take some time for server to boot to start working",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodeJS",
        color: "green-text-gradient",
      },
      {
        name: "MERN",
        color: "pink-text-gradient",
      },
    ],
    link: "https://japanezy.liamkillingback.com",
    image: japaneasy,
    source_code_link: "https://github.com/liamkillingback/Japaneasy",
  },
  {
    name: "AI Images",
    description:
      "Simple one page react App for AI generated images! server is freely hosted so may take some time to generate images!",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodeJS",
        color: "green-text-gradient",
      },
      {
        name: "MERN",
        color: "pink-text-gradient",
      },
    ],
    link: "https://ai-images.liamkillingback.com",
    image: aiImages,
    source_code_link: "https://github.com/liamkillingback/image_ai_MERN",
  },
  {
    name: "Electical Company",
    description:
      "Company website for my small electrical business located in the mornington peninsula, SE of Melbourne",
    tags: [
      {
        name: "REACT",
        color: "blue-text-gradient",
      },
      {
        name: "Node.js",
        color: "green-text-gradient",
      },
    ],
    image: Electrics,
    source_code_link: "https://github.com/liamkillingback",
  },
  {
    name: "News",
    description:
      "Created a news webpage that uses an Api to recieve news based on category or searches",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "MERN",
        color: "pink-text-gradient",
      },
    ],
    image: newsVid,
    source_code_link: "https://github.com/liamkillingback/News-App",
  },
  {
    name: "Photography",
    description:
      "Photography/Animation website. Uses cloudinary for image storage and node for the backend.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "MongoDB",
        color: "green-text-gradient",
      },
      {
        name: "MERN",
        color: "pink-text-gradient",
      },
      {
        name: "Cloudinary",
        color: "blue-text-gradient",
      },
    ],
    image: Harry,
    source_code_link: "https://github.com/liamkillingback/HarryCrosby",
  },
];

export const blogPosts = [
  {
    title: "Binary-Tree-Traversal-Rust",
    description:
      "Now that i've got a grasp for binary trees, let's explore some algorithms and put them in use!",
    publishedAt: "6th June, 2023",
    img: "https://media.geeksforgeeks.org/wp-content/uploads/20221124174432/binary.png",
  },
  {
    title: "Binary-Search-Trees",
    description:
      "Practical learning using Rust exploring binary search trees and how to use them!",
    publishedAt: "4th June, 2023",
    img: "https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg",
  },
  {
    title: "MERN-User-Authentication",
    description: "Creating a user authentication system using the MERN stack",
    publishedAt: "2nd May, 2023",
    img: "https://d3mxt5v3yxgcsr.cloudfront.net/courses/7646/course_7646_image.png",
  },
  {
    title: "React-redux",
    description:
      "Using react-redux alongsite redux-persist to achieve state shared across all pages/components",
    publishedAt: "23rd April, 2023",
    img: "https://waftengine.org/public/blog/1B5EE4D5D773F8A-RR.jpg",
  },
];
