/* eslint-disable prettier/prettier */
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
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await fauna.query(
          q.Create(q.Collection('users'), {
            data: {
              email: user.email,
            },
          })
        )

        return true
      } catch {}
      return false
    },
  },
}

export default NextAuth(authOptions)
