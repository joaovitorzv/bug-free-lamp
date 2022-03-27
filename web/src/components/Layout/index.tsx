import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectSession, signout } from "../../actions/sessionSlice";
import { dropSession } from "../../auth/session";

function Layout() {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);
  return (
    <div>
      <header
        style={{ padding: "10px", backgroundColor: "black", color: "white" }}
      >
        <h2>that's definitely the header!</h2>
        {session.username && (
          <button
            onClick={() => {
              dispatch(signout());
              dropSession();
            }}
          >
            @{session.username} signout
          </button>
        )}
      </header>
      <Outlet />
    </div>
  );
}

export default Layout;
