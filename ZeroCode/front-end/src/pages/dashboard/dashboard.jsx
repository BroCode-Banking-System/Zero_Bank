import { FaUniversity, FaWallet, FaCreditCard, FaPiggyBank } from "react-icons/fa";

export default function Dashboard() {
  const accounts = [
    {
      id: "savings",
      title: "Savings Account",
      balance: "₹3,25,000",
      accountNumber: "****1234",
      lastTransaction: "+₹15,000",
      icon: <FaWallet className="text-indigo-500 text-3xl" />,
    },
    {
      id: "current",
      title: "Current Account",
      balance: "₹1,75,000",
      accountNumber: "****5678",
      lastTransaction: "-₹2,500",
      icon: <FaUniversity className="text-green-500 text-3xl" />,
    },
    {
      id: "credit",
      title: "Credit Card",
      balance: "Used: ₹25,000 / ₹1,00,000",
      accountNumber: "****7890",
      lastTransaction: "Due: 25 Sep",
      icon: <FaCreditCard className="text-red-500 text-3xl" />,
    },
    {
      id: "fd",
      title: "Fixed Deposit",
      balance: "₹50,000 @ 7%",
      accountNumber: "Maturity: 12 Dec",
      lastTransaction: "Interest: ₹3,500",
      icon: <FaPiggyBank className="text-yellow-500 text-3xl" />,
    },
  ];

  const transactions = [
    { id: 1, date: "20 Sep 2025", desc: "Salary Credit", amount: "+₹75,000", type: "credit" },
    { id: 2, date: "18 Sep 2025", desc: "Online Shopping", amount: "-₹5,200", type: "debit" },
    { id: 3, date: "16 Sep 2025", desc: "Electricity Bill", amount: "-₹2,300", type: "debit" },
    { id: 4, date: "14 Sep 2025", desc: "FD Interest", amount: "+₹3,500", type: "credit" },
  ];

  return (
    <div className="p-4 container mx-auto py-5">
      {/* Welcome */}
      <h2 className="text-2xl font-bold mb-2">Welcome back, Customer!</h2>
      <p className="text-gray-600 mb-6">Here’s your account overview at a glance.</p>

      {/* Small Cards Row */}
      <div className="row g-3 mb-6">
        {/* Total Balance Card */}
        <div className="col-sm-4">
          <div className="bg-indigo-600 text-dark rounded-2xl shadow p-4 text-center">
            <h5 className="text-md font-semibold">Total Balance</h5>
            <p className="text-2xl font-bold mt-1">₹5,42,000</p>
            <p className="text-xs mt-1 opacity-80">Updated just now</p>
          </div>
        </div>

        {/* Example: Other small cards */}
        <div className="col-sm-4">
          <div className="bg-green-600 text-dark rounded-2xl shadow p-4 text-center">
            <h5 className="text-md font-semibold">Monthly Spending</h5>
            <p className="text-2xl font-bold mt-1">₹1,25,000</p>
            <p className="text-xs mt-1 opacity-80">Updated just now</p>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="bg-yellow-600 text-dark rounded-2xl shadow p-4 text-center">
            <h5 className="text-md font-semibold">Investments</h5>
            <p className="text-2xl font-bold mt-1">₹2,00,000</p>
            <p className="text-xs mt-1 opacity-80">Updated just now</p>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="bg-yellow-600 text-dark rounded-2xl shadow p-4 text-center">
            <h5 className="text-md font-semibold">Investments</h5>
            <p className="text-2xl font-bold mt-1">₹5,00,000</p>
            <p className="text-xs mt-1 opacity-80">Updated just now</p>
          </div>
        </div>

        
      </div>
    </div>
  );
}
