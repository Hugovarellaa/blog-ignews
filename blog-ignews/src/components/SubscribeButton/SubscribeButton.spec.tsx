import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeButton } from "./index";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

jest.mock("next-auth/react");

jest.mock("next/router");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMoked = jest.mocked(useSession);

    useSessionMoked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const useSessionMoked = jest.mocked(useSession);

    useSessionMoked.mockReturnValueOnce({ data: null, status: "loading" });

    const signInMocked = jest.mocked(signIn);
    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);
    expect(signInMocked).toHaveBeenCalled();
  });

  it("redirect to posts when user already has a subscription", () => {
    const useRouterMocked = jest.mocked(useRouter);
    const useSessionMoked = jest.mocked(useSession);
    const pushMock = jest.fn();

    useSessionMoked.mockReturnValueOnce({
      data: {
        user: {
          name: "Jhon Doe",
          email: "jhondoe@example.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "faker-expires",
      },
      status: "authenticated",
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");
    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith("/posts");
  });
});
