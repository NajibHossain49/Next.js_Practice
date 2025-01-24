"use client";
import { useState } from "react";
import axios from "axios";

const AddRole = () => {
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedRole = role.trim();
    if (!trimmedRole) {
      setMessage("Please enter a valid role.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3444/role/addrole", { 
        role: trimmedRole 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check for specific success conditions
      if (response.status === 200 || response.status === 201) {
        setMessage("Role added successfully!");
        setRole("");
      } else {
        setMessage("Unexpected response from server.");
      }
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        setMessage(error.response.data.message || "Failed to add role. Server error.");
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("No response from server. Check your network connection.");
      } else {
        // Something happened in setting up the request
        setMessage("Error in request setup. Please try again.");
      }
      console.error("Role addition error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Role</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="role" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Role
            </label>
            <input
              id="role"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter role name"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 
              ${isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              }`}
          >
            {isLoading ? 'Adding...' : 'Add Role'}
          </button>
        </form>

        {message && (
          <p 
            className={`mt-4 text-center font-semibold ${
              message.includes("successfully") 
                ? "text-green-600" 
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddRole;