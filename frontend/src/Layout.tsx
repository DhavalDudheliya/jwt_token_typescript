import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-screen w-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
