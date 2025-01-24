"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-emerald-100 to-emerald-300">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-600"></div>
          <p className="text-emerald-800 text-xl font-semibold">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const handleUpdate = () => {
    router.push("/updateProfile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-emerald-200 transform transition-all hover:scale-105 duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-24 absolute w-full opacity-20"></div>
          
          <div className="relative z-10 flex flex-col items-center pt-8 pb-6 px-6">
            <div className="relative">
              <img
                src={`http://localhost:3444/user/getimage/${user.filename}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-emerald-800 mt-4 mb-2">{user.name}</h2>
            <p className="text-emerald-600 text-sm mb-4">#{user.userid}</p>

            <div className="w-full space-y-3 mt-4">
              <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-emerald-800">{user.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-xs text-emerald-600 uppercase font-semibold mb-1">Username</p>
                  <p className="text-emerald-800 font-medium">{user.username}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <p className="text-xs text-emerald-600 uppercase font-semibold mb-1">Role</p>
                  <p className="text-emerald-800 font-medium">{user.role.role}</p>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg">
                <p className="text-xs text-emerald-600 uppercase font-semibold mb-1">Address</p>
                <p className="text-emerald-800 font-medium">{user.address}</p>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="mt-6 w-full bg-emerald-500 text-white py-3 rounded-full hover:bg-emerald-600 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <span>Update Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}