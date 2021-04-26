import {MongoClient} from "https://deno.land/x/mongo@v0.22.0/mod.ts";

export default async function db() {
    const client: MongoClient = new MongoClient();
    // @ts-ignore
    await client.connect(window.env.MONGODB_CONNECTION_STRING);
    // @ts-ignore
    return client.database(window.env.DB_NAME)
}