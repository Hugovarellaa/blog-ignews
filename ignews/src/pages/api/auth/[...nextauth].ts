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
    async session({ session, user, token }) {
      try {
        const userActiverSubscription = await fauna.query(
          q.Get(
            q.Intersection([
              q.Match(
                q.Index('subscription_by_user_ref'),
                q.Select(
                  'ref',
                  q.Get(
                    q.Match(
                      q.Index('users_by_email'),
                      q.Casefold(session.user.email),
                    ),
                  ),
                ),
              ),
              q.Match(q.Index('subscription_by_status'), 'active'),
            ]),
          ),
        )
        return {
          ...session,
          activeSubscription: userActiverSubscription,
        }
      } catch (error) {
        console.log(error)
        return {
          ...session,
          activeSubscription: null,
        }
      }
    },

    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    },
  },
}

export default NextAuth(authOptions)
