import React from 'react'
import { Navbar, Header, About, Projects, Contact } from "../components";


const Home = () => {
  return (
    <>
    <div className='sm:px-[5%] px-5'>
        <Header />
        <About />
        <Projects />
        <Contact />

    </div>
    </>
  )
}

export default Home