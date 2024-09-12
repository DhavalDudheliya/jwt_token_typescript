/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export interface UserContextType {
  user: any | null;
  loading: boolean;
  getUser: () => void;
}

// Create a context
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [loading, serLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  // Get user data
  const getUser = async () => {
    try {
      await axios.get("/users/getUser").then((response) => {
        setUser(response.data); // Set user to the response data
      });
      serLoading(false);
    } catch (error) {
      setUser(null); // Set user to null if there's an error
      console.log(error);
    } finally {
      serLoading(false); // Set loading to false when the request is finished
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
