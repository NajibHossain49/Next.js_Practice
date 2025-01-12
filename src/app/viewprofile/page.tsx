"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
interface User {
  userid: number;
  name: string;
  email: string;
  username: string;
  address: string;
  filename: string;
  role: {
    id: number;
    role: string;
  };
}

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/signin");
          return;
        }

        const response = await axios.get(
          "http://localhost:3444/user/viewprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/signin");
      }
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  const handleUpdate = () => {
    router.push("/updateProfile");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-200 to-green-400">
        <div className="card w-96 bg-white shadow-xl rounded-lg border border-gray-200">
          <figure className="px-10 pt-10">
            <img
              src={`http://localhost:3444/user/getimage/${user.filename}`}
              alt="Profile"
              className="rounded-full w-24 h-24 border-4 border-green-500"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-lg font-bold text-gray-800">
              ID: {user.userid}
            </h2>
            <div className="text-left w-full mt-2 space-y-1">
              <p className="text-gray-700">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="text-gray-700">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="text-gray-700">
                <strong>Role:</strong> {user.role.role}
              </p>
            </div>
            <div className="card-actions mt-4">
              <button
                onClick={handleUpdate}
                className="btn bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-full transition ease-in-out duration-200"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
