import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    axios.get(
      "http://localhost:5000/api/auth/me",
      {
        withCredentials: true
      }
    )
    .then(() => {
      setIsAuth(true);
    })
    .catch(() => {
      setIsAuth(false);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-xl">
        Loading...
      </div>
    );
  }

  // NOT AUTHORIZED
  if (!isAuth) {
   return <Navigate to="/admin/login" replace />;
  }

  // AUTHORIZED
  return children;
}