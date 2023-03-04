import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

export interface AsgardeoProfile extends Record<string, any> {
  sub: string
  nickname: string
  email: string
  picture: string
}

export default function Asgardeo<P extends AsgardeoProfile>(
  options: OAuthUserConfig<P>,
  organisation: string
): OAuthConfig<P> {
  return {
    id: "asgardeo",
    name: "Asgardeo",
    type: "oauth",
    wellKnown: `https://api.asgardeo.io/t/${organisation}/oauth2/token/.well-known/openid-configuration`,
    authorization: { params: { scope: "openid email profile" } },
    idToken: true,
    checks: ["pkce", "state"],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }
    },
    options,
  }
}