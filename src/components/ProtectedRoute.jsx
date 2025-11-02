import { Navigate } from "react-router-dom";
import useAppSelector from "../hooks/useAppSelector";
export default function ProtectedRoute({ children }) {
  const isAuth = useAppSelector((s) => Boolean(s.auth.token));
  return isAuth ? children : <Navigate to="/login" replace />;
}
