import { useUser } from "@/contexts/useUser";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { user, loading } = useUser();

    const navigate = useNavigate();

    // Redirect to login page if user is not authenticated
    useEffect(() => {
      if (!loading && !user) {
        navigate("/login");
      }
    }, [user, loading, navigate]);

    return <WrappedComponent {...(props as P)} user={user} loading={loading} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
