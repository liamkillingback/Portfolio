import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, BlogPage, PostPage } from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/:id' element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
