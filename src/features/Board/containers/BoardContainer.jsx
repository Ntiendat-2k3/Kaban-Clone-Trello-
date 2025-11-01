import { useState } from "react";
import { Box } from "@mui/material";
import List from "../components/List/List"; // Import component Cột

// --- GIẢ LẬP DỮ LIỆU TẠM THỜI ---
// Sau này dữ liệu này sẽ lấy từ React Query
const MOCK_BOARD = {
  id: "board-1",
  title: "Dự án KanbanFlow",
  lists: [
    { id: "list-1", title: "Todo", cardOrder: ["card-1", "card-2"] },
    { id: "list-2", title: "Doing", cardOrder: ["card-3"] },
    { id: "list-3", title: "Done", cardOrder: [] },
  ],
  cards: [
    {
      id: "card-1",
      listId: "list-1",
      title: "Thiết kế UI/UX",
    },
    {
      id: "card-2",
      listId: "list-1",
      title: "Code layout cho Board",
    },
    {
      id: "card-3",
      listId: "list-2",
      title: "Gọi API Board",
    },
  ],
};
// ------------------------------------

/**
 * Component "thông minh" quản lý toàn bộ logic của Board.
 * Nơi chứa DndContext, gọi API (React Query), xử lý logic kéo thả.
 */
function BoardContainer() {
  // Tạm thời dùng useState, sau này sẽ là data từ React Query
  const [board, setBoard] = useState(MOCK_BOARD);

  // Hàm này để lọc ra các card thuộc về một list
  const getCardsForList = (listId) => {
    return board.cards.filter((card) => card.listId === listId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto", // Cho phép cuộn ngang
        flexGrow: 1,
        p: 2, // padding
      }}
    >
      {/* Sau này <DndContext> của dnd-kit sẽ bọc ở đây
       */}
      {board.lists.map((list) => (
        <List key={list.id} list={list} cards={getCardsForList(list.id)} />
      ))}
    </Box>
  );
}

export default BoardContainer;
