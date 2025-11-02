import { CircularProgress, Box } from "@mui/material";
export default function Spinner() {
  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}
