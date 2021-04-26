import {Bson} from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import hash from "https://deno.land/x/object_hash@2.0.3.1/mod.ts";
import userModel, {UserSchema} from "../Models/User.ts";
import personalAccessTokenModel from "../Models/PersonalAccessToken.ts";

interface IReturns {
  isAuth: boolean
  user?: UserSchema|null
  attributes?: string[]
  token?: any
}

const returnNull = () => ({
  isAuth: false,
  user: null,
  attributes: [],
})

export default async function getAuthUserByBearerToken(token: string): Promise<IReturns> {
  if (!token) {
    return returnNull();
  }
  //@ts-ignore
  const personalAccessTokens = personalAccessTokenModel.getCollection();
  const usersCollection = userModel.getCollection();
  const [id, hashedToken] = String(token)
    .replace("Bearer", "")
    .trim()
    .split("|");

  if (id && hashedToken) {
    try {
      const _token = await personalAccessTokens.findOne({
        //@ts-ignore
        _id: new Bson.ObjectId(id),
        dateExpires: { $gte: new Date() },
      });
      if (!_token) {
        return returnNull();
      } else {
        if (hashedToken === hash(_token.token, { algorithm: "sha1" })) {
          const user = await usersCollection.findOne({ _id: _token.user });
          personalAccessTokens.updateOne(
            { _id: _token._id },
            { $set: { dateLastUse: new Date() } }
          );
          return {
            isAuth: true,
            user,
            attributes: _token.attributes,
            token: _token,
          };
        } else {
          return returnNull();
        }
      }
    } catch (e) {
      return returnNull();
    }
  } else {
    return returnNull();
  }
}
