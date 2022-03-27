import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { signout } from "../../actions/sessionSlice";

function Layout() {
  const dispatch = useDispatch();

  return (
    <div>
      <header
        style={{ padding: "10px", backgroundColor: "black", color: "white" }}
      >
        <h2>that's definitely the header!</h2>
        <button onClick={() => dispatch(signout())}>signout</button>
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
