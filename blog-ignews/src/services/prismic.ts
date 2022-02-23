import Prismic from "@prismicio/client";

export function getPrismicClient() {
  const prismic = new Prismic.Client(process.env.PRISMIC_IO_API_ENDPOINT, {
    accessToken: process.env.PRISMIC_IO_ACCESS_TOKEN,
  });
  return prismic;
}
