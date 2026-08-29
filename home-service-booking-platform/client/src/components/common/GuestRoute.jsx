import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function GuestRoute() {
  const {
    user,
    isAuthenticated,
    loadingUser,
  } = useAuth();

  // ==========================================
  // WAIT FOR AUTH CHECK
  // ==========================================

  if (loadingUser) {
    return (
      <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />

          <p className="mt-4 text-gray-600 font-medium">
            Checking your account...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // ALREADY AUTHENTICATED
  // ==========================================

  if (isAuthenticated && user) {
    // Admin trying to access Login/Register
    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    // Customer trying to access Login/Register
    if (user.role === "customer") {
      return (
        <Navigate
          to="/"
          replace
        />
      );
    }
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  return <Outlet />;
}

export default GuestRoute;