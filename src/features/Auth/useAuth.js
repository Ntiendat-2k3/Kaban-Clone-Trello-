import useAppSelector from "../../hooks/useAppSelector";
export default function useAuth() {
  return useAppSelector((s) => s.auth);
}
