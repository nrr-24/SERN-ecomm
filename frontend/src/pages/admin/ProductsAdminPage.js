import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProductsForAdmin();
  }, []);

  const fetchProductsForAdmin = () => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    axios
      .get("http://127.0.0.1:3001/products/admin", {
        headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
      })
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.categoryId) {
      alert("Please fill all the fields.");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    axios
      .post(
        "http://127.0.0.1:3001/products/admin/create-product",
        newProduct,
        { headers: { Authorization: `Bearer ${token}` } } // Pass token in headers
      )
      .then(() => {
        setNewProduct({ name: "", description: "", price: "", categoryId: "" });
        fetchProductsForAdmin();
        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
        alert("Failed to add product. Please try again.");
      });
  };

  const handleUpdateProduct = (productId) => {
    if (!editingProduct.name || !editingProduct.description || !editingProduct.price || !editingProduct.categoryId) {
      alert("Please fill all the fields.");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    axios
      .put(
        `http://127.0.0.1:3001/products/admin/update-product/${productId}`,
        editingProduct,
        { headers: { Authorization: `Bearer ${token}` } } // Pass token in headers
      )
      .then(() => {
        setEditingProduct(null);
        fetchProductsForAdmin();
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the product!", error);
        alert("Failed to update product.");
      });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      axios
        .delete(`http://127.0.0.1:3001/products/admin/delete-product/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
        })
        .then(() => {
          fetchProductsForAdmin();
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
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
          className="form-control mb-2"
        />
        <button className="btn btn-success" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      {/* Display Products */}
      <div className="list-group">
        {products.map((product) => (
          <div key={product.productId} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {editingProduct && editingProduct.productId === product.productId ? (
                <div>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="form-control mb-2"
                  />
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="form-control mb-2"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="form-control mb-2"
                  />
                  <input
                    type="text"
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="form-control mb-2"
                  />
                  <button className="btn btn-primary btn-sm mx-1" onClick={() => handleUpdateProduct(product.productId)}>
                    Save
                  </button>
                  <button className="btn btn-secondary btn-sm mx-1" onClick={() => setEditingProduct(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <h5>{product.name}</h5>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>Category ID: {product.categoryId}</p>
                </div>
              )}
            </div>
            {!editingProduct && (
              <div>
                <button className="btn btn-primary btn-sm mx-1" onClick={() => setEditingProduct(product)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDeleteProduct(product.productId)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsAdminPage;
