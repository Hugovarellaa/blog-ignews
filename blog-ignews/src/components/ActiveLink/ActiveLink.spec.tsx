import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

test("active link render correctly", () => {
  const { debug } = render(
    <ActiveLink activeClassName="active" href="/">
      <a>home</a>
    </ActiveLink>
  );

  debug();
});
