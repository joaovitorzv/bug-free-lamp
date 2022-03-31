import { render, screen } from "../../test-utils";
import { MemoryRouter } from "react-router-dom";

import Signup from "./index";
import userEvent from "@testing-library/user-event";

const signup = (
  <MemoryRouter>
    <Signup />
  </MemoryRouter>
);

test("should render signup page", () => {
  render(signup);

  expect(screen.getByTestId("signup")).toBeInTheDocument();
});

test("error if login without empty username", () => {
  render(signup);

  userEvent.click(screen.getByText(/signup/i));
  expect(screen.getByTestId("error-msg")).toBeInTheDocument();
});
