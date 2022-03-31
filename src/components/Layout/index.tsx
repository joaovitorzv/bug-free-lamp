import { Outlet } from "react-router-dom";
import Header from "../Header";

function Layout() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
