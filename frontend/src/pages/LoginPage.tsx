import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  // State to handle login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to handle errors
  const [error, setError] = useState("");

  // Use navigate hook to redirect after login
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);

      if (response.status === 200 || response.data.success) {
        // Redirect to home page upon successful login
        navigate("/home");
      }
    } catch (error) {
      // Display error if login fails
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-center justify-between w-full gap-4">
            <Button className="w-full" type="submit">
              Sign in
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/register">
              <p className="font-semibold text-sm">
                Don't have an account? Sign up
              </p>
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;
