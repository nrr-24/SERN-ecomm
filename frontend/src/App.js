import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

// Import pages
import CategoriesPage from './pages/user/CategoriesPage';
import ProductsPage from './pages/user/ProductsPage';
import DashboardPage from './pages/user/DashboardPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import CategoriesAdminPage from './pages/admin/CategoriesAdminPage';
import DashboardAdminPage from './pages/admin/DashboardAdminPage';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Dashboard/Home route */}
                    <Route path="/home" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardAdminPage />} />

                    {/* User routes */}
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/category/:id" element={<ProductsPage />} />

                    {/* Authentication routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Admin routes */}
                    <Route path="/categories/admin" element={<CategoriesAdminPage />} />
                    <Route path="/products/admin" element={<ProductsAdminPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
