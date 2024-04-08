import { useContext, useState, useEffect } from "react";
import { Login } from "../components/Login";
import { AuthContext } from "./AuthProvider";

export const CheckAuth = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
    invalidtoken: false,
  });

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setStatus({
          loading: false,
          error: false,
          invalidtoken: true,
        });
        return;
      }

      const response = await fetch(import.meta.env.VITE_API_URL + "auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // console.log(response);
      // console.log(data);
      if (data.error) {
        setStatus({
          loading: false,
          error: true,
          invalidtoken: true,
        });
        return;
      }
      if (data.user) {
        setUser(data.user);
      }
      setStatus({
        loading: false,
        error: false,
        invalidtoken: false,
      });
    };

    verifyToken();
  }, []);

  if (status.loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-gray-200 ">
        Loading...
      </div>
    );
  }

  if (status.invalidtoken) {
    return <Login />;
  }

  if (status.error) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-gray-200 ">
        Error. Please try again later.
      </div>
    );
  }

  return <>{children}</>;
};
