import ICollection from "../contracts/ICollection.ts";

export interface IBaseModel<S> {
    getCollection(): ICollection<S>
}
export default class BaseModel {
    // @ts-ignore
    collection: string = null
    connection: any = null
    constructor(connection: any = null) {
        this.connection = connection
    }

    protected async format(model: any): Promise<{
        [key: string]: any
    }> {
        return {_id: null}
    }

    public async formatter(models: any | any[]) {
        return Array.isArray(models)
            ? models.map(async (model: any) => await this.format(model))
            : this.format(models);
    }

    getCollection(): ICollection<any> {
        //@ts-ignore
        return undefined;
    }
}