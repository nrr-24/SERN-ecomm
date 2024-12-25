import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CategoriesPage />} />
          <Route path="/category/:id" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
