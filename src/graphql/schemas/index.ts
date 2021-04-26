import {expandGlob} from "https://deno.land/std@0.93.0/fs/mod.ts";
import {gql} from "https://deno.land/x/oak_graphql/mod.ts";

var schemas = `
  type Nil {
    nil: String
  }
  type Query {
    nil: Nil
  }
  type Mutation {
    nil(nil: String): Nil
  }
`

for await (const file of expandGlob("**/*.graphql")) {
  schemas += await Deno.readTextFile(file.path);
}

export default gql(schemas)