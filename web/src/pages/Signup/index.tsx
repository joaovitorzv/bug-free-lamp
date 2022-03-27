import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/sessionSlice";
import { keepSession } from "../../auth/session";

function Signup() {
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useState(false);

  const dispatch = useDispatch();

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) {
      return setFormError(true);
    }

    keepSession(username);
    dispatch(signup({ username }));
  }
  return (
    <div>
      <h3>Welcome again, signup below!</h3>
      <form onSubmit={handleSignup}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        {formError && <p>please type your username</p>}
        <button type="submit">signup</button>
      </form>
    </div>
  );
}

export default Signup;
