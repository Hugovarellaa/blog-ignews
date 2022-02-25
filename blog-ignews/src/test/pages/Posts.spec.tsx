import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";
import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-posts",
  title: "My New Post",
  content: "<p>Post content</p>",
  updateAt: "01 de Abril",
};

jest.mock("next-auth/react");
jest.mock("../../services/prismic");

describe("Pots page", () => {
  it("renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("My New Post"));
    expect(screen.getByText("Post content"));
  });

  it("redirects user if no subscription is found", async () => {
    //retornando que o usuario esta deslogado
    const getSessionMocked = jest.mocked(getSession);
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: "my-new-posts" },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: "/",
          permanent: false,
        }),
      })
    );
  });

  it("loads initial data", async () => {
    //retornando que o usuario esta autenticado
    const getSessionMocked = jest.mocked(getSession);

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: "fake-active-subscription",
    } as any);

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

    const response = await getServerSideProps({
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
