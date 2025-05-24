import './App.css';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BillingInvoicesPage from './pages/BillingInvoicesPage';
import PlansAddOnsPage from './pages/PlansAddOnsPage';
import UserProfilePage from './pages/Userprofile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to register */}
        <Route path="/" element={<Navigate to="/register" />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard/userprofile" element={<UserProfilePage />} />
        <Route path="/dashboard/billing" element={<BillingInvoicesPage />} />
        <Route path="/dashboard/plans" element={<PlansAddOnsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
