import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from '../components/ProductList';

function ProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3001/products/category/${id}`)
  .then((response) => {
    setProducts(response.data);
  })
  .catch((error) => {
    console.error("There was an error fetching the products!", error);
  });

  }, [id]);

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <ProductList products={products} />
    </div>
  );
}

export default ProductsPage;
