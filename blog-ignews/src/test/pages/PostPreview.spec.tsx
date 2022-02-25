import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-posts",
  title: "My New Post",
  content: "<p>Post content</p>",
  updateAt: "01 de Abril",
};

jest.mock("next-auth/react");
jest.mock("next/router");
jest.mock("../../services/prismic");

describe("Pots preview page", () => {
  it("renders correctly", () => {
    const useSessionMocked = jest.mocked(useSession);
    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });
    render(<Post post={post} />);

    expect(screen.getByText("My New Post"));
    expect(screen.getByText("Post content"));
    expect(screen.getByText("Wanna continue reading?"));
  });

  it("redirects user to full post when user is subscribed", () => {
    const useSessionMocked = jest.mocked(useSession);
    const useRouterMocked = jest.mocked(useRouter);

    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: {
          name: "Jhon Doe",
          email: "jhondoe@example.com",
        },
        activeSubscription: "fake-active-subscription",
        expires: "faker-expires",
      },
      status: null,
    });

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any);

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith("/posts/my-new-posts");
  });

  it("loads initial data", async () => {
    //mocando o prismicio
    const getPrismicClientMocked = jest.mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: "heading", text: "My New Post" }],
          content: [{ type: "paragraph", text: "Post content" }],
        },
        last_publication_date: "04-01-2022",
      }),
    } as any);

    const response = await getStaticProps({
      params: {
        slug: "my-new-posts",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "my-new-posts",
            title: "My New Post",
            content: "<p>Post content</p>",
            updateAt: "01 de abril de 2022",
          },
        },
      })
    );
  });
});
