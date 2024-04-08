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
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus({
        loading: false,
        error: false,
        invalidtoken: true,
      });
      return;
    }

    fetch(import.meta.env.VITE_API_URL + "auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          setStatus({
            loading: false,
            error: false,
            invalidtoken: true,
          });
          return;
        }
        if (!res.ok) {
          throw new Error("An error occurred");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setStatus({
          loading: false,
          error: false,
          invalidtoken: false,
        });
      })
      .catch((error) => {
        console.error(error);
        setStatus({
          loading: false,
          error: true,
          data: null,
          invalidtoken: false,
        });
      });
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
