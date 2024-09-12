import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const IndexPage = () => {
  return (
    <div className="flex gap-4">
      <Link to="/login">
        <Button>Log in</Button>
      </Link>
      <Link to="/register">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
};

export default IndexPage;
