'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Signin from "./signin/page";
import LandingPage from "./Home/page"; 

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/");
  };

  return isLoggedIn ? (
    <LandingPage handleLogout={handleLogout} />
  ) : (
    <Signin />
  );
}
