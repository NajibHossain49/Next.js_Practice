"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link from next/link

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/"); // Navigate to the home page after logout
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">My App</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/Home">
              {" "}
              {/* Use Link for navigation */}
              Home
            </Link>
          </li>
          <li>
            <Link href="/viewprofile">
              {" "}
              {/* Use Link for navigation */}
              Profile
            </Link>
          </li>
          <li>
            <Link href="/AddRole">
              {" "}
              {/* Use Link for navigation */}
              Add-Role
            </Link>
          </li>
          <li>
            <Link href="/NewEmployee">
              {" "}
              {/* Use Link for navigation */}
              New-Employee
            </Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {username && <span className="font-semibold">{username}</span>}
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
