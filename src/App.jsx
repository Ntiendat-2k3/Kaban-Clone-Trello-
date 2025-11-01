import { RouterProvider } from "react-router-dom";
import router from "./routes"; // Import router từ file routes

function App() {
  return <RouterProvider router={router} />;
}

export default App;
