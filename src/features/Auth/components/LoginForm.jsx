import { useForm } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Button from "../../../components/Button/Button";
import { authApi } from "../../../api/authApi";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { setCredentials } from "../authSlice";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit } = useForm({ defaultValues: { email: "" } });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await authApi.login(data);
    dispatch(
      setCredentials({
        user: { id: res.id, email: res.email, name: res.name },
        token: res.token,
      })
    );
    navigate("/", { replace: true });
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Card sx={{ width: 360 }}>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">Đăng nhập</Typography>
            <TextField label="Email" {...register("email")} />
            <Button onClick={handleSubmit(onSubmit)}>Login (Mock)</Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
