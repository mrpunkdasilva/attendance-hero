import { RouterProvider } from "react-router-dom";
import router from "./routes/root";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router.createRouter()} />
    </AuthProvider>
  );
}

export default App;
