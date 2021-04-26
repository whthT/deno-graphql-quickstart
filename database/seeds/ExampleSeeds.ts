export default function ExampleSeeds(connection: any) {
    const collection = connection.collection("examples")
    collection.insertMany([
        {
            name: "GraphQL"
        },
        {
            name: "NodeJS"
        }
    ])
}