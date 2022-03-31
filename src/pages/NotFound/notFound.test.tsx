import { render, screen } from "../../test-utils";
import { MemoryRouter } from "react-router-dom";

import NotFound from "./index";

it("show not found error message", () => {
  render(
    <MemoryRouter initialEntries={["/invalid-route"]}>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByTestId("notFound")).toBeInTheDocument();
});
