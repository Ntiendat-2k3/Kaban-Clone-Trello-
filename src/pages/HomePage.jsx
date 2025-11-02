import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DEFAULT_BOARD_ID } from "../config/constants";
export default function HomePage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Chọn bảng
        </Typography>
        <Card sx={{ maxWidth: 360 }}>
          <CardActionArea component={Link} to={`/boards/${DEFAULT_BOARD_ID}`}>
            <CardContent>
              <Typography>Demo Board</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </Box>
  );
}
