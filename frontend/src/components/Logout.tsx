import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Send a request to the backend to handle logout
      const response = await axios.post("/auth/logout");

      if (response.status === 200 || response.data.success) {
        // Redirect to login page or home page after successful logout
        navigate("/login");
      } else {
        setError("Logout failed. Please try again.");
      }
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Log Out"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LogOut;
