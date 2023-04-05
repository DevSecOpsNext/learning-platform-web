import NextAuth from "next-auth"
import AsgardeoProvider from "../../../lib/authentication/providers/asgardeo"

export const authOptions = {
  providers: [
    AsgardeoProvider({
      clientId: `${process.env.ASGARDEO_ID}`,
      clientSecret: `${process.env.ASGARDEO_SECRET}`,
    }, `${process.env.ASGARDEO_ORG}`),
  ],
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)