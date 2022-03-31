import { render, screen } from "./test-utils";

import App from "./App";

test("default public route should be /signup", () => {
  render(<App />);
  expect(screen.getByTestId("signup")).toBeInTheDocument();
});
