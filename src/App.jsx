import Category from "./components/categoty/category";
import Checkbox from "./components/checkbox";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
   <Router>
      <Navbar />
      {/* <Routes> यह बताता है कि इनमें से केवल एक <Route> मैच होगी */}
      <Routes>
        {/* '/' पाथ पर Hero कॉम्पोनेंट दिखेगा */}
        <Route path="/" element={<Hero />} />
        {/* '/category' पाथ पर Category कॉम्पोनेंट दिखेगा */}
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  )
}

export default App;
