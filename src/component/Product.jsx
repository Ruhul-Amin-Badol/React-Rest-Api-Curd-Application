import React, { useState } from "react";
import { apiserverpoint } from "./apiserverpoint";
import axios from "axios";

const Product = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("Token"); // Ensure this matches the key used in Login
    try {
      const response = await axios.post(
        `${apiserverpoint}/api/product`,
        {
          name,
          details,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log("Product created", response.data);
      setMessage("Product created successfully!");
      // Clear the form fields
      setName("");
      setDetails("");
    } catch (error) {
      console.error("There was an error creating the product!", error);
      setMessage("Failed to create product.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Create Product</h2>
              <form onSubmit={handleProductSubmit}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Details:</label>
                  <textarea
                    className="form-control"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Create Product
                </button>
              </form>
              {message && <p className="text-success mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
