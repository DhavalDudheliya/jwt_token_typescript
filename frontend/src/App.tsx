import { Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import axios from "axios";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./contexts/UserContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
