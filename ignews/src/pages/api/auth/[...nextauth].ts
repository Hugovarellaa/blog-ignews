import { fauna } from '@/src/services/faunadb'
import { query as q } from 'faunadb'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user
      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index('users_by_email'), q.Casefold(user.email)),
              ),
            ),
            q.Create(q.Collection('users'), {
              data: {
                email,
              },
            }),
            q.Get(q.Match(q.Index('users_by_email'), q.Casefold(user.email))),
          ),
        )
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
}

export default NextAuth(authOptions)
