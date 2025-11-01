import PropTypes from "prop-types";
import { Box, Typography, Paper } from "@mui/material";
import Card from "../Card/Card";

/**
 * Component hiển thị một Cột (List)
 */
function List({ list, cards }) {
  return (
    <Paper
      sx={{
        minWidth: 300,
        maxWidth: 300,
        mx: 1, // margin ngang
        height: "fit-content",
        backgroundColor: "#ebecf0", // Màu cột Trello
      }}
    >
      {/* Tiêu đề Cột */}
      <Typography
        sx={{
          p: 2,
          fontWeight: "bold",
        }}
      >
        {list.title}
      </Typography>

      {/* Danh sách các Thẻ */}
      <Box
        sx={{
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1, // khoảng cách giữa các thẻ
          maxHeight: "calc(100vh - 200px)", // Giới hạn chiều cao
          overflowY: "auto", // Cho phép cuộn dọc nếu nhiều thẻ
        }}
      >
        {/* Sau này <SortableContext> của dnd-kit sẽ bọc ở đây
         */}
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        {/* Kết thúc SortableContext */}
      </Box>

      {/* Footer Cột (Nút "Thêm thẻ") */}
      <Box sx={{ p: 1 }}>
        <Typography
          sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}
        >
          + Thêm thẻ
        </Typography>
      </Box>
    </Paper>
  );
}

// --- Định nghĩa PropTypes ---
List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      listId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
