import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/navber";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import LoginModal from "./component/loginmodal";
import Footer from "./component/footer";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* Modal should be available on all pages */}
      <LoginModal />
      <Footer />
    </BrowserRouter>
  );
}

export default App;


