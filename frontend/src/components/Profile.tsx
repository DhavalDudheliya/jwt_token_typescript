import { useState, useEffect } from "react";
import { useUser } from "@/contexts/useUser";
import axios from "axios";
import { UserContextType } from "@/contexts/UserContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Profile = () => {
  const { user, getUser }: UserContextType = useUser(); // Assuming getUser refreshes user data
  const [name, setName] = useState(user?.name || "");

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put("/users/updateProfile", {
        name: name,
      });
      if (response.status === 200) {
        // Call getUser to refresh the user data in the context
        getUser();
      }
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          value={name}
          placeholder={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h2>{user?.name}</h2>
      </div>
      <div>{user?.email}</div>

      <Button onClick={handleUpdate}>Save</Button>
    </div>
  );
};

export default Profile;
