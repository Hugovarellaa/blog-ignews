import faunadb from 'faunadb'

const secret = process.env.FAUNA_SECRET_KEY

export const fauna = new faunadb.Client({
  secret,
})
