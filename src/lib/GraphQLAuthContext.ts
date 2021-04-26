import getAuthUserByBearerToken from "./getAuthUserByBearerToken.ts"
import userModel, {UserSchema} from "../Models/User.ts";

export interface IAuthContext {
    isAuth(): boolean
    user: UserSchema
    attributes: string[]
}
export class AuthContext implements IAuthContext{
    user: UserSchema
    attributes: string[]
    constructor(ctx: any) {
        this.user = ctx.user
        this.attributes = ctx.attributes
    }

    isAuth() {
        return !!this.user
    }
}

export default async function GraphQLAuthContext(ctx: any): Promise<IAuthContext> {
    const authInfo = await getAuthUserByBearerToken(ctx.request.headers.get('authorization'))
    const authContext =  new AuthContext(authInfo);
    if (authContext.isAuth()) {
        const collection = userModel.getCollection()
        collection.updateOne({ _id: authInfo.user?._id }, {
            $set: { dateLastLogin: new Date() }
        })
    }
    return authContext
}