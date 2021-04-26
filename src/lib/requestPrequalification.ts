import {AuthContext} from "./GraphQLAuthContext.ts"

export default function requestPrequalification(ctx: AuthContext) {
  if (!ctx.isAuth()) {
    throw new Error("Unauthenticated.");
  }
}
