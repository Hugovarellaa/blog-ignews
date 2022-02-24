import { render } from "@testing-library/react";
import { ActiveLink } from ".";

test("active link render correctly", () => {
  const { debug } = render(
    <ActiveLink activeClassName="active" href="/">
      <a>home</a>
    </ActiveLink>
  );

  debug();
});
