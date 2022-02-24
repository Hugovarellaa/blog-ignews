import { render, screen } from "@testing-library/react";
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
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(screen.getByText("home")).toBeInTheDocument();
  });

  it("adds active class if the link currently activecy", () => {
    render(
      <ActiveLink activeClassName="active" href="/">
        <a>home</a>
      </ActiveLink>
    );

    expect(screen.getByText("home")).toHaveClass("active");
  });
});
