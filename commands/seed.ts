// @ts-nocheck
import {parse} from "https://deno.land/std/flags/mod.ts";
import DatabaseSeeds from "../database/seeds/DatabaseSeeds.ts"
import connection from "../src/database.ts"
import IProgramArgs from "../src/contracts/IProgramArgs.ts";


const args: IProgramArgs = parse(Deno.args)

 if (args.fresh) {
    const collections = await connection.listCollectionNames()
    for (const collectionName of collections) {
        const collection = connection.collection(collectionName)
        collection.drop()
    }
 }

for (const seed of DatabaseSeeds) {
    console.log("Seeding: "+ seed.name);
    await seed(connection)
    console.log("Seeded: "+ seed.name);
}
