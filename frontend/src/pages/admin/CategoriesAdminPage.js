import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriesAdminPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });

    // Fetch categories for admin on component load
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        axios
            .get("http://127.0.0.1:3001/categories/admin", {
                headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
            })
            .then((response) => {
                setCategories(response.data.categories); // Response structure based on getAllCategoriesForAdmin
            })
            .catch((error) => {
                console.error("There was an error fetching the categories for admin!", error);
            });
    };
    

    const handleAddCategory = () => {
        if (!newCategory.name || !newCategory.description) {
            alert("Both name and description are required.");
            return;
        }
    
        const token = localStorage.getItem("token"); // Retrieve the token
    
        axios
            .post(
                "http://127.0.0.1:3001/categories/admin/create",
                newCategory,
                {
                    headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
                }
            )
            .then(() => {
                setNewCategory({ name: '', description: '' }); // Clear input fields
                fetchCategories(); // Refresh the category list
                alert("Category added successfully!");
            })
            .catch((error) => {
                console.error("There was an error adding the category!", error);
                alert("Failed to add category. Please try again.");
            });
    };
    

    const handleUpdateCategory = (id) => {
        const updatedName = prompt("Enter new category name:");
        const updatedDescription = prompt("Enter new category description:");
    
        if (updatedName && updatedDescription) {
            const token = localStorage.getItem("token"); // Retrieve the token
            axios
                .put(`http://127.0.0.1:3001/categories/admin/update/${id}`, {
                    name: updatedName,
                    description: updatedDescription,
                }, {
                    headers: { Authorization: `Bearer ${token}` }, // Add the token
                })
                .then(() => {
                    fetchCategories(); // Refresh the list after update
                    alert("Category updated successfully!");
                })
                .catch((error) => {
                    console.error("There was an error updating the category!", error);
                    alert("Failed to update category.");
                });
        }
    };
    

    const handleDeleteCategory = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            const token = localStorage.getItem("token"); // Retrieve the token
            axios
                .delete(`http://127.0.0.1:3001/categories/admin/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Add the token
                })
                .then(() => {
                    fetchCategories(); // Refresh the list after deletion
                    alert("Category deleted successfully!");
                })
                .catch((error) => {
                    console.error("There was an error deleting the category!", error);
                    alert("Failed to delete category.");
                });
        }
    };
    

    return (
        <div className="container">
            <h1 className="my-4">Admin Categories</h1>

            {/* Add New Category Form */}
            <div className="mb-4">
                <h3>Add New Category</h3>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    className="form-control mb-2"
                />
                <textarea
                    placeholder="Category Description"
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    className="form-control mb-2"
                />
                <button className="btn btn-success" onClick={handleAddCategory}>
                    + Add Category
                </button>
            </div>

            {/* Display Categories */}
            <div className="list-group">
                {categories.length === 0 ? (
                    <p>No categories found</p>
                ) : (
                    categories.map((category) => (
                        <div
                            key={category.categoryId}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <h5>{category.name}</h5>
                                <p>{category.description}</p>
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary btn-sm mx-1"
                                    onClick={() => handleUpdateCategory(category.categoryId)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger btn-sm mx-1"
                                    onClick={() => handleDeleteCategory(category.categoryId)}
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

export default CategoriesAdminPage;
