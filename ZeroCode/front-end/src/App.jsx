import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from "./component/navber";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import OpenAccount from "./pages/account";
import OpenLoan from "./pages/loan";
import OpenInsurance from "./pages/insurance";
import LoginModal from "./component/loginmodal";
import Footer from "./component/footer";

//Admin Dashboard Components
import DashFooter from "./pages/adminDashboard/Footer";
import Dashboard from "./pages/adminDashboard/Dashboard";
import DashboardSidebar from "./pages/adminDashboard/Sidebar";
import DashboardAccount from "./pages/adminDashboard/Accounts";
import DashboardFundTransfer from "./pages/adminDashboard/FundTransfer";
import DashboardDepositHistory from "./pages/adminDashboard/DepositHistory";
import DashboardSettings from "./pages/adminDashboard/Settings";
import DashboardWithdrawalHistory from "./pages/adminDashboard/WithdrawalHistory";
import DashboardProfile from "./pages/adminDashboard/Profile";

function App() {
  const isLoggedIn = true;
  const location = useLocation();

  // check if route starts with /adminDashboard
  const isDashboardRoute = location.pathname.startsWith("/adminDashboard");

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar only for public pages */}
      {!isDashboardRoute && <Navbar />}

      {/* Main Content */}
      <div className="flex-grow-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<OpenAccount />} />
          <Route path="/loan" element={<OpenLoan />} />
          <Route path="/insurance" element={<OpenInsurance />} />

          {/* Dashboard routes */}
          <Route
            path="/adminDashboard/*"
            element={isLoggedIn ? <AdminDashboardWrapper /> : <Navigate to="/login" />}
          />
          <Route
            path="/employeeDashboard/*"
            element={isLoggedIn ? <EmployeeDashboardWrapper /> : <Navigate to="/login" />}
          />
          <Route
            path="/userDashboard/*"
            element={isLoggedIn ? <UserDashboardWrapper /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      {/* Footer */}
      {!isDashboardRoute && <LoginModal />}
      {!isDashboardRoute && <Footer />} {/* Public pages */}
    </div>
  );
}

// Admin Dashboard Wrapper
function AdminDashboardWrapper() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <DashboardSidebar />
      <div className="flex-grow-1 p-4">
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="accounts" element={<DashboardAccount />} />
          <Route path="fund-transfer" element={<DashboardFundTransfer />} />
          <Route path="deposit-history" element={<DashboardDepositHistory />} />
          <Route path="withdrawal-history" element={<DashboardWithdrawalHistory />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Routes>
        <DashFooter />
      </div>
    </div>
  );
}

// Employee Dashboard Wrapper
function EmployeeDashboardWrapper() {
  return (
    <div className="dashboard-body">
      <DashboardSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="" element={<Dashboard />} />
          <Route path="accounts" element={<DashboardAccount />} />
          <Route path="fund-transfer" element={<DashboardFundTransfer />} />
          <Route path="deposit-history" element={<DashboardDepositHistory />} />
          <Route path="withdrawal-history" element={<DashboardWithdrawalHistory />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="profile" element={<DashboardProfile />} />
        </Routes>
      </div>
      <DashFooter />
    </div>
  );
}

// User Dashboard Wrapper
function UserDashboardWrapper() {
  return (
    <div className="dashboard-body">
      <DashboardSidebar />
      <div className="dashboard-content">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="account" element={<OpenAccount />} />
          <Route path="loan" element={<OpenLoan />} />
          <Route path="insurance" element={<OpenInsurance />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
      <DashFooter />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
