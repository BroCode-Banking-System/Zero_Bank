import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./component/navber";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import OpenAccount from "./pages/account";
import OpenLoan from "./pages/loan";
import OpenInsurance from "./pages/insurance";
import LoginModal from "./component/loginmodal";
import Footer from "./component/footer";

import Header from "./pages/dashboard/Header";
import DashFooter from "./pages/dashboard/Footer";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardSidebar from "./pages/dashboard/Sidebar";
import DashboardAccount from "./pages/dashboard/Accounts";
import DashboardFundTransfer from "./pages/dashboard/FundTransfer";
import DashboardDepositHistory from "./pages/dashboard/DepositHistory";
// import DashboardLoginPage from "./pages/dashboard/LoginPage";
import DashboardSettings from "./pages/dashboard/Settings";
import DashboardWithdrawalHistory from "./pages/dashboard/WithdrawalHistory";
import DashboardProfile from "./pages/dashboard/Profile";



function App() {
  const isLoggedIn = true; // replace with actual auth check
  const location = useLocation();

  // check if route starts with /dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && <Navbar />}

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
          path="/dashboard/*"
          element={
            isLoggedIn ? <DashboardWrapper /> : <Navigate to="/login" />
          }
        />
      </Routes>

      {/* Login modal + Footer only for public pages */}
      {!isDashboardRoute && <LoginModal />}
      {!isDashboardRoute && <Footer />}
    </>
  );
}

// Dashboard Layout
function DashboardWrapper() {
  return (
    <div className="dashboard-layout">
      <Header />

      <div className="dashboard-body">
        <DashboardSidebar />

        {/* Nested routes render here */}
        <div className="dashboard-content">
          <Routes>
            {/* Default route when you go to /dashboard */}
            <Route index element={<Dashboard />} />

            {/* Named nested routes */}
            <Route path="accounts" element={<DashboardAccount />} />
            <Route path="fund-transfer" element={<DashboardFundTransfer />} />
            <Route path="deposit-history" element={<DashboardDepositHistory />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="withdrawal-history" element={<DashboardWithdrawalHistory />} />
            <Route path="profile" element={<DashboardProfile />} />

            {/* Example of future pages */}
            {/* <Route path="profile" element={<Profile />} /> */}
          </Routes>
        </div>
      </div>

      <DashFooter />

      {/* Some basic layout styling */}
      <style jsx="true">{`
        .dashboard-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .dashboard-body {
          display: flex;
          flex: 1;
          }
          .dashboard-content {
            margin-top: 50px; 
            flex: 1;
            padding: 20px;
        }
      `}</style>
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
