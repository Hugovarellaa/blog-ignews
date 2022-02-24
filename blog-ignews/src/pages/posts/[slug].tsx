import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../services/prismic";
import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.slug} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updateAt}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID<any>("teste", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updateAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-br",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${post.slug}`,
        permanent: false,
      },
    };
  }

  return {
    props: { post },
  };
};
