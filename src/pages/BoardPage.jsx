import { Box } from "@mui/material";
import BoardContainer from "../features/Board/containers/BoardContainer";
import BoardHeader from "../features/Board/components/BoardHeader"; // Tạm thời

/**
 * Trang hiển thị chi tiết một Board.
 * Nó chỉ nên làm nhiệm vụ layout và lắp ráp các "features".
 */
function BoardPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f4f5f7", // Màu nền Trello
      }}
    >
      {/* Header của Board (Tên Board, Nút Thêm...) */}
      <BoardHeader />

      {/* Container chính chứa các cột (List) */}
      <BoardContainer />
    </Box>
  );
}

export default BoardPage;
