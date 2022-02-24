import { render, screen } from "@testing-library/react";
import { SignInButton } from "./index";
import { mocked } from "jest-mock";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react");

describe("SignInButton components", () => {
  it("renders correctly when is not authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Jonh Doe",
          email: "john.doe@example.com",
        },
        expires: "fake-expires",
      },
      status: "authenticated",
    });

    render(<SignInButton />);

    expect(screen.getByText(/Jonh doe/i)).toBeInTheDocument();
  });
});
