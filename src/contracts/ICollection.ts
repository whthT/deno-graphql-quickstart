import {
    CountOptions,
    DeleteOptions,
    DistinctOptions,
    Document,
    DropOptions,
    FindOptions,
    InsertOptions,
    UpdateOptions
} from "https://deno.land/x/mongo@v0.22.0/mod.ts";


interface CommandCursor<T> {

    execute(): void

    next(): Promise<T | undefined>

    forEach(callback: (item: T, index: number) => void):void

    map<M>(callback: (item: T, index: number) => M): Promise<M[]>

    toArray(): Promise<T[]>
}

interface FindCursor<T> extends CommandCursor<T> {
    executor(): Promise<{ id: any }>

    limit(limit: number): this

    skip(skip: number): this

    sort(sort: Document): this
}

export default interface ICollection<T> {
    find(filter?: Document, options?: FindOptions): FindCursor<T>

    findOne(
        filter?: Document,
        options?: FindOptions,
    ): Promise<T | undefined>

    count(filter?: Document, options?: CountOptions): Promise<number>

    insertOne(doc: T, options?: InsertOptions): Promise<number>

    insert(docs: T | T[], options?: InsertOptions): Promise<{ insertedIds: Document[]; insertedCount: number }>

    insertMany(
        docs: T[],
        options?: InsertOptions,
    ): Promise<{ insertedIds: Document[]; insertedCount: number }>

    updateOne(filter: Document, update: Document, options?: UpdateOptions): Promise<{
        upsertedId: string | undefined,
        upsertedCount: number,
        matchedCount: number,
        modifiedCount: number,
    }>

    updateMany(filter: Document, doc: Document, options?: UpdateOptions): Promise<{
        upsertedId: string | undefined,
        upsertedCount: number,
        matchedCount: number,
        modifiedCount: number,
        multi: boolean
    }[]>

    deleteMany(filter: Document, options?: DeleteOptions): Promise<number>


    deleteOne(filter: Document, options?: DeleteOptions): Promise<number>

    drop(options?: DropOptions): Promise<void>

    distinct(key: string, query?: Document, options?: DistinctOptions): any
}
