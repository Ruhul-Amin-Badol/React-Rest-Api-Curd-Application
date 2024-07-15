import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiserverpoint } from "./apiserverpoint";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await axios.get(`${apiserverpoint}/api/product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Assuming the response data contains the products array directly
        setProducts(response.data.data); // Adjust this line based on the actual response structure
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the products!", error);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    // Redirect to the product edit page (assuming you have a route for editing products)
    navigate(`/product-edit/${productId}`);
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("Token");
    try {
      await axios.delete(`${apiserverpoint}/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("There was an error deleting the product!", error);
      setError("Failed to delete product.");
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.details}</td>
              <td className="d-flex gap-2">
                <button
                  className="btn btn-warning mr-4"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-3"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
