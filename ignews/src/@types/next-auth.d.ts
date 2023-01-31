/* eslint-disable no-unused-vars */
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    activeSubscription: string | null
  }
}
