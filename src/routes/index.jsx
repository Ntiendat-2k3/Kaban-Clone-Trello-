import { createBrowserRouter } from "react-router-dom";
import BoardPage from "../pages/BoardPage";
import HomePage from "../pages/HomePage"; // Trang chọn board
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, // Tạm thời
    errorElement: <NotFound />,
  },
  {
    path: "/board/:boardId",
    element: <BoardPage />,
  },
  // Thêm các route khác như /login, /register sau
]);

export default router;
