import { Navigate } from "react-router-dom";
import { useAuthStore, type Role } from "../store/authStore";

import Wrapper from "../components/Wrapper";
import Sidebar from "../components/AppSidebar";

type PrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles: Role[];
};

function PrivateRoute({ children, allowedRoles }: PrivateRouteProps) {
  const user = useAuthStore((state) => state?.user);
  const hasHydrated = useAuthStore((state) => state?.hasHydrated);

  if (!hasHydrated) {
    return <Wrapper>Loading...</Wrapper>; // or a spinner
  }

  if (!user || !allowedRoles?.includes(user?.role)) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Sidebar />

      <main className="ml-64 min-h-screen min-w-0">{children}</main>
    </div>
  );
}

export default PrivateRoute;
