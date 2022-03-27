import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/sessionSlice";

function Signup() {
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch();

  function handleSignup() {
    if (!username) {
      setFormError(true);
    }

    dispatch(signup({ username }));
  }
  return (
    <div>
      <h3>Welcome again, signup below!</h3>
      <form>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        {formError && <p>please type your username</p>}
        <button onClick={handleSignup}>signup</button>
      </form>
    </div>
  );
}

export default Signup;
