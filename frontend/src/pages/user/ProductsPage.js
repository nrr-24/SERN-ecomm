import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../../components/ProductList';

function ProductsPage() {
  const { id } = useParams(); // Get category ID from the URL if it exists
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch products for a specific category
      axios
        .get(`http://127.0.0.1:3001/products/category/${id}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the products by category!", error);
        });
    } else {
      // Fetch all products if no category ID is provided
      axios
        .get("http://127.0.0.1:3001/products")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching all products!", error);
        });
    }
  }, [id]); // Re-run this effect whenever the category ID changes

  return (
    <div className="container">
      <h1 className="my-4">{id ? "Products in Category" : "All Products"}</h1>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
