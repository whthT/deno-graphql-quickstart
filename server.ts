
// @ts-nocheck

import {config} from "https://deno.land/x/dotenv/mod.ts";
import {Application, Router} from "https://deno.land/x/oak/mod.ts";
import {applyGraphQL} from "https://deno.land/x/oak_graphql/mod.ts";

import graphqlSchemas from "./src/graphql/schemas/index.ts";
import resolvers from "./src/graphql/resolvers/index.ts";

import GraphQLAuthContext from "./src/lib/GraphQLAuthContext.ts"
import db from "./src/database.ts";

declare global {
  var db: any;
  var env: IGlobalEnv;
  var currentRequest: any;
  interface Window {
    db: any;
    env: IGlobalEnv;
    currentRequest: any
  }
}

window.env = config();
window.db = await db();

const app = new Application();
app.use(async (ctx, next) => {
  window.currentRequest = ctx.request
  await next()
})
const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: graphqlSchemas,
  resolvers,
  context: GraphQLAuthContext
});

app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${
      hostname ?? "localhost"
    }:${port}`
  );

});

await app.listen({ port: 8000 });
