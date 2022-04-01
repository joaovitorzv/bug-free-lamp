import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Route,
  RouteProps,
  Routes,
} from "react-router-dom";
import { selectSession } from "../actions/sessionSlice";
import Layout from "../components/Layout";
import Network from "../pages/Network";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";

type EnsureType = {
  children: JSX.Element;
  hasSession?: boolean;
  onlyPrivate?: boolean;
  onlyPublic?: boolean;
};

const EnsureProtected = ({
  hasSession,
  onlyPrivate,
  onlyPublic,
  children,
}: EnsureType) => {
  if (hasSession && onlyPublic) {
    return <Navigate to="/network" />;
  }
  if (!hasSession && onlyPrivate) {
    return <Navigate to="/signup" />;
  }

  return children;
};

function AppRoutes() {
  const session = useSelector(selectSession);
  const hasSession = !!session.username;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route
            path="/signup"
            element={
              <EnsureProtected hasSession={hasSession} onlyPublic>
                <Signup />
              </EnsureProtected>
            }
          />
          <Route
            path="/network"
            element={
              <EnsureProtected hasSession={hasSession} onlyPrivate>
                <Network />
              </EnsureProtected>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
