import React from 'react';
import { Link } from 'react-router-dom';

function CategoryList({ categories }) {
  return (
    <div className="list-group">
      {categories.map((category) => (
        <Link key={category.categoryId} to={`/category/${category.categoryId}`} className="list-group-item list-group-item-action">
          {category.name}
        </Link>
      ))}
    </div>
  );
}

export default CategoryList;