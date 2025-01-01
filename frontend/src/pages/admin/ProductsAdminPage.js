import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    Category_ID: "",
  });

  // Fetch products for admin on component load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    axios
      .get("http://127.0.0.1:3001/products/admin", {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
      })
      .then((response) => {
        setProducts(response.data.products); // Response structure based on getAllProductsForAdmin
      })
      .catch((error) => {
        console.error("There was an error fetching the products for admin!", error);
      });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.Category_ID) {
      alert("Please fill all the fields.");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    axios
      .post("http://127.0.0.1:3001/products/admin/create", newProduct, {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
      })
      .then(() => {
        setNewProduct({ name: "", description: "", price: "", Category_ID: "" }); // Clear input fields
        fetchProducts(); // Refresh the product list
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
        alert("Failed to add product. Please try again.");
      });
  };

  const handleUpdateProduct = (productId) => {
    const updatedName = prompt("Enter new product name:");
    const updatedDescription = prompt("Enter new product description:");
    const updatedPrice = prompt("Enter new product price:");
    const updatedCategoryId = prompt("Enter new Category ID:");

    if (updatedName && updatedDescription && updatedPrice && updatedCategoryId) {
      const token = localStorage.getItem("token"); // Retrieve the token
      axios
        .put(
          `http://127.0.0.1:3001/products/admin/update/${productId}`,
          {
            name: updatedName,
            description: updatedDescription,
            price: updatedPrice,
            Category_ID: updatedCategoryId,
          },
          {
            headers: { Authorization: `Bearer ${token}` }, // Add the token
          }
        )
        .then(() => {
          fetchProducts(); // Refresh the list after update
          alert("Product updated successfully!");
        })
        .catch((error) => {
          console.error("There was an error updating the product!", error);
          alert("Failed to update product.");
        });
    }
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token"); // Retrieve the token
      axios
        .delete(`http://127.0.0.1:3001/products/admin/delete/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Add the token
        })
        .then(() => {
          fetchProducts(); // Refresh the list after deletion
          alert("Product deleted successfully!");
        })
        .catch((error) => {
          console.error("There was an error deleting the product!", error);
          alert("Failed to delete product.");
        });
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Admin Products</h1>

      {/* Add New Product Form */}
      <div className="mb-4">
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="form-control mb-2"
        />
        <textarea
          placeholder="Product Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Category ID"
          value={newProduct.Category_ID}
          onChange={(e) => setNewProduct({ ...newProduct, Category_ID: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      {/* Display Products */}
      <div className="list-group">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((product) => (
            <div
              key={product.productId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category ID: {product.Category_ID}</p>
              </div>
              <div>
                <button
                  className="btn btn-primary btn-sm mx-1"
                  onClick={() => handleUpdateProduct(product.productId)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsAdminPage;
