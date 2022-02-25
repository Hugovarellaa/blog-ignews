import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "my-new-posts",
    title: "My New Post",
    excerpt: "Post excerpt",
    updateAt: "10 de Abril ",
  },
];

jest.mock("../../services/prismic");

describe("Post page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My New Post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-posts",
            data: {
              title: [{ type: "heading", text: "My New Post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "04-01-2022",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-posts",
              title: "My New Post",
              excerpt: "Post excerpt",
              updateAt: "01 de abril de 2022",
            },
          ],
        },
      })
    );
  });
});
