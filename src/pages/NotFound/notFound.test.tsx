import { render, screen } from "../../test-utils";
import { MemoryRouter } from "react-router-dom";

import NotFound from "./index";

test("landing on a bad page", () => {
  render(
    <MemoryRouter initialEntries={["/badlink"]}>
      <NotFound />
    </MemoryRouter>
  );

  expect(screen.getByTestId("notFound")).toBeInTheDocument();
});
