import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/sessionSlice";
import { keepSession } from "../../auth/session";
import InputLabel from "../../components/Input";
import useFormError from "../../hooks/useFormError";

import "./styles.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [formError, setFormError] = useFormError();

  const dispatch = useDispatch();

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) {
      return setFormError({
        error: true,
        message: "You can't login without a username",
      });
    }

    keepSession(username);
    dispatch(signup({ username }));
  }
  return (
    <div className="signupContainer">
      <div className="signupCard">
        <h3>Welcome to CodeLeap network!</h3>
        <form onSubmit={handleSignup}>
          <InputLabel label="Please enter your username" htmlFor="username">
            <input
              id="username"
              name="username"
              placeholder="Jhon Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputLabel>
          {formError.error && (
            <p className="errorMessage">{formError.message}</p>
          )}
          <div className="signupActions">
            <button
              type="submit"
              className={username.length === 0 ? "disabledButton" : ""}
            >
              signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
