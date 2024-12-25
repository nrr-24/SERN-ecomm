import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage'; // Import the Dashboard

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<DashboardPage />} />

          {/* Categories and Products */}
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<ProductsPage />} />

          {/* Login and Register */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
