import Faunadb from 'faunadb'

export const fauna = new Faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
})
