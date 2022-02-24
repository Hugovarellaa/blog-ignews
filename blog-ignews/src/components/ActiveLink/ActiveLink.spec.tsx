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

describe("Active Link components", () => {
  test("active link render correctly", () => {
    const { getByText } = render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(getByText("home")).toBeInTheDocument();
  });

  test("active link is receiving active class", () => {
    const { getByText } = render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(getByText("home")).toHaveClass("active");
  });
});
