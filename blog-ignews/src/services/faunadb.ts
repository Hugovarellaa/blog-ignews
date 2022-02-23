import FaunaDB from "faunadb";

export const fauna = new FaunaDB.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
});
