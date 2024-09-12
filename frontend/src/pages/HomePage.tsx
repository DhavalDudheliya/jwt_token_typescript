/* eslint-disable @typescript-eslint/no-explicit-any */
import LogOut from "@/components/Logout";
import Profile from "@/components/Profile";
import DebouncedInput from "@/components/ui/debounceInput";
import withAuth from "@/utils/withAuth";

const WithoutAuthHomePage: React.FC<any> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Profile />
      <DebouncedInput />
      <LogOut />
    </div>
  );
};

const HomePage = withAuth(WithoutAuthHomePage);
export default HomePage;
