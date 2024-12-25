import React from 'react';

function ProductList({ products }) {
  return (
    <div className="list-group">
      {products.map((product) => (
        <div key={product.productId} className="list-group-item">
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}


export default ProductList;
