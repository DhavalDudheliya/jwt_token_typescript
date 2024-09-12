import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
import { ChangeEvent, FormEvent, useState } from "react";

const SignUpPage = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle form change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/auth/register`, formData);

      if (response.status === 201 || response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      setError("Sign up failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="tel"
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            <Button className="w-full">Sign up</Button>
            {error && <p className="text-red-500">{error}</p>}
            <Link to="/login">
              <p className="font-semibold text-sm">
                Already have an account? Log in
              </p>
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default SignUpPage;
