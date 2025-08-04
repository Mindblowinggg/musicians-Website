import Category from "./components/category/category";
import Checkbox from "./components/checkbox";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/navbar";
import Results from "./components/searchresults/result";
import ArtistDetailPage from "./components/ArtistDetailPage/ArtistDetailPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./components/aboutus/AboutUs";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/category" element={<Category />} />
        <Route path="/results" element={<Results />} />
         <Route path="/artist/:id" element={<ArtistDetailPage />} />
         <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
