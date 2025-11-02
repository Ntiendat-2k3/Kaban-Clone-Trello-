import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Avatar,
  Button,
} from "@mui/material";
import useAuth from "../../Auth/useAuth";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { logout } from "../../Auth/authSlice";

export default function BoardHeader({ title }) {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  return (
    <AppBar position="sticky" color="inherit" elevation={1} sx={{ mb: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar sx={{ width: 28, height: 28 }}>
            {user?.name?.[0] || "U"}
          </Avatar>
          <Typography variant="body2">{user?.name || "Guest"}</Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch(logout())}
          >
            Đăng xuất
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
