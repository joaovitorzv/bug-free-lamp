import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { selectSession } from "../actions/sessionSlice";
import Layout from "../components/Layout";
import Network from "../pages/Network";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";

type EnsureType = {
  children: JSX.Element;
  authorized?: boolean;
};

const EnsurePublic = ({ children, authorized }: EnsureType) => {
  if (authorized) {
    return <Navigate to="/network" />;
  }
  return children;
};

const EnsureAuth = ({ children, authorized }: EnsureType) => {
  if (!authorized) {
    return <Navigate to="/signup" />;
  }
  return children;
};

function AppRoutes() {
  const session = useSelector(selectSession);
  const isAuthorized = !!session.username;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route
            path="/signup"
            element={
              <EnsurePublic authorized={isAuthorized}>
                <Signup />
              </EnsurePublic>
            }
          />
          <Route
            path="/network"
            element={
              <EnsureAuth authorized={isAuthorized}>
                <Network />
              </EnsureAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
