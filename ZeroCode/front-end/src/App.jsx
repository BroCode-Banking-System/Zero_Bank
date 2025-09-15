import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./component/navber";
import Home from "./pages/home";
/*import Login from "./pages/auth/login";*/
import Dashboard from "./pages/dashboard/dashboard";
import About from "./pages/about";
import LoginModal from "./component/loginmodal";
import Footer from "./component/footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/login" element={<Login />} />*/}
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
