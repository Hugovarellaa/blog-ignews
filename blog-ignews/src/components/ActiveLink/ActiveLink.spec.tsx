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
  it("renders correctly", () => {
    const { getByText } = render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(getByText("home")).toBeInTheDocument();
  });

  it("adds active class if the link currently activecy", () => {
    const { getByText } = render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(getByText("home")).toHaveClass("active");
  });
});
