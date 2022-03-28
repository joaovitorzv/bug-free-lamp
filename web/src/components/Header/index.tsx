import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VscSignOut as SignoutIcon } from "react-icons/vsc";

import { selectSession, signout } from "../../actions/sessionSlice";
import { dropSession } from "../../auth/session";
import logo from "../../logo.png";

import "./styles.css";

function Header() {
  const dispatch = useDispatch();

  const session = useSelector(selectSession);

  return (
    <header className="container">
      <div className="brand">
        <Link to="/network">
          <img
            src={logo}
            alt="codeleap logo"
            style={{ filter: "invert(100%)" }}
            height={45}
          />
          <h2>Network</h2>
        </Link>
      </div>
      <nav className="headerNav">
        {session.username && (
          <button
            onClick={() => {
              dispatch(signout());
              dropSession();
            }}
          >
            <SignoutIcon size={18} />
            <span>@{session.username} signout</span>
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
