import { RouterProvider } from "react-router-dom";
import router from "./routes/root";

function App() {
  return <RouterProvider router={router.createRouter()} />;
}

export default App;
