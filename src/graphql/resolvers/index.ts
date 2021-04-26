// @ts-nocheck
import {expandGlob} from "https://deno.land/std@0.93.0/fs/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

const resolver = {
  Query: {
    nil(){
      return 'nil'
    },
  },
  Mutation: {
    nil() {
      return 'nil'
    }
  },
};
for await (const file of expandGlob(path.join(Deno.cwd(), "/src/graphql/resolvers/*Resolver.ts"))) {
  if (file.name !== "index.ts") {
    //@ts-ignore
    const data = await import('file://' + file.path)    
    if('Query' in data.default) {
      for (const d: string in data.default.Query) {
        resolver.Query[d] = data.default.Query[d]
      }
    }

    if('Mutation' in data.default) {
      for (const d in data.default.Mutation) {
        resolver.Mutation[d] = data.default.Mutation[d]
      }
    }
    
  }
}

export default resolver;
