import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/login';
import Product from './component/Product';
import ProductList from './component/ProductList'; // Import the ProductList component
import ProductEdit from './component/ProductEdit';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
          <div className="container">
            <Link className="navbar-brand" to="/">API CURD APPLICATION</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">  
                <li className="nav-item">
                  <Link className="nav-link" to="/">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/productsList">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/product-create">Create Product</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/product-create" element={<Product />} /> {/* If you have a separate product creation component */}
            <Route path="/productsList" element={<ProductList />} /> {/* Add the ProductList route */}
            <Route path="/product-edit/:productId" element={<ProductEdit />} /> {/* Add the edit route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
