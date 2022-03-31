import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { VscSignOut as SignoutIcon } from "react-icons/vsc";

import * as Modal from "../Modal";
import { selectSession, signout } from "../../actions/sessionSlice";
import { dropSession } from "../../auth/session";
import logo from "../../logo.png";

import "./styles.css";

function Header() {
  const dispatch = useDispatch();

  const [signoutPostDialog, setSignoutPostDialog] = useState(false);
  const session = useSelector(selectSession);

  function handleSignout() {
    setSignoutPostDialog(false);
    dispatch(signout());
    dropSession();
  }

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
          <button onClick={() => setSignoutPostDialog(true)}>
            <SignoutIcon size={18} />
            <span>@{session.username} Sign out</span>
          </button>
        )}
      </nav>
      <Modal.Modal
        header="Sign out"
        description="You will be signed out of Codeleap Network"
        isOpen={signoutPostDialog}
        onDismiss={setSignoutPostDialog}
      >
        <Modal.Actions>
          <button onClick={() => setSignoutPostDialog(false)}>Cancel</button>
          <button onClick={handleSignout} className="warnButton">
            Sign out
          </button>
        </Modal.Actions>
      </Modal.Modal>
    </header>
  );
}

export default Header;
