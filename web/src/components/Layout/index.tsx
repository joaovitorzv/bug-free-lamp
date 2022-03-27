import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header
        style={{ padding: "10px", backgroundColor: "black", color: "white" }}
      >
        <h2>that's definitely the header!</h2>
        <button />
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
