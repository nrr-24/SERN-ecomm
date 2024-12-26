import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryList from '../../components/CategoryList';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/categories")
      .then((response) => {
        if (response.data && response.data.categories) {
          setCategories(response.data.categories); // Extract the nested categories array
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the categories!", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Categories</h1>
      <CategoryList categories={categories} />
    </div>
  );
}

export default CategoriesPage;
