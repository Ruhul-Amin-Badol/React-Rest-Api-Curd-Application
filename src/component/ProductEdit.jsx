import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { apiserverpoint } from "./apiserverpoint";

const ProductEdit = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({ name: "", details: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await axios.get(
          `${apiserverpoint}/api/product/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the product!", error);
        setError("Failed to load product.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("Token");
    try {
      await axios.put(`${apiserverpoint}/api/product/${productId}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/productsList");
    } catch (error) {
      console.error("There was an error updating the product!", error);
      setError("Failed to update product.");
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
      <h2 className="text-center mb-4">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Details:</label>
          <textarea
            className="form-control"
            name="details"
            value={product.details}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-2">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default ProductEdit;
