//@ts-nocheck
import tokenGenerator from "./tokenGenerator.ts";
import hash from "https://deno.land/x/object_hash@2.0.3.1/mod.ts";
import moment from "https://deno.land/x/momentjs@2.29.1-deno/mod.ts";
import {Bson} from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import personalAccessTokenModel from "../Models/PersonalAccessToken.ts";

export default async function createWebToken(
    {user, tokenName = "web", attributes = []}: { user: any, tokenName?: string, attributes?: any[] }
) {

  const personalAccessTokens = personalAccessTokenModel.getCollection()

  const token = tokenGenerator();
  const tokenId = await personalAccessTokens.insertOne({
    // @ts-ignore
    user: Bson.ObjectId.isValid(user._id) ? user._id : Bson.ObjectId(user._id),
    name: tokenName,
    token,
    attributes,
    dateExpires: moment(new Date()).add(1, "weeks").toDate(),
    dateLastUse: new Date(),
    dateCreate: new Date(),
    dateUpdate: new Date(),
  });

  return `${tokenId}|${hash(token, { algorithm: "sha1" })}`;
}
