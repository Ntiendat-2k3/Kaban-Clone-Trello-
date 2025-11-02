import LoginForm from "../features/Auth/components/LoginForm";
import useAppSelector from "../hooks/useAppSelector";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  const isAuth = useAppSelector((s) => Boolean(s.auth.token));
  if (isAuth) return <Navigate to="/" replace />;
  return <LoginForm />;
}
