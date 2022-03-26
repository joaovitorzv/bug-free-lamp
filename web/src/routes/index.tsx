import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Network from "../pages/Network";
import Signup from "../pages/Signup";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/network" element={<Network />} />
        <Route
          path="*"
          element={
            <div>
              <p>404, page not found</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
