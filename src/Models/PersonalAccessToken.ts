//@ts-nocheck
import BaseModel from "./BaseModel.ts";
import ICollection from "../contracts/ICollection.ts";

export interface PersonalAccessTokenSchema {
  _id?: { $oid: string };
  user: { $oid: string },
  name: string,
  token: string,
  attributes: string[],
  dateExpires: Date,
  dateLastUse: Date,
  dateCreate: Date,
  dateUpdate: Date,
}

export class PersonalAccessTokenModel extends BaseModel {
  collection = "personalAccessTokens"

  getCollection(): ICollection<PersonalAccessTokenSchema> {
    if (this.connection)
      return this.connection.collection(this.collection)
    //@ts-ignore
    return window.db.collection(this.collection)
  }
}

const personalAccessTokenModel = new PersonalAccessTokenModel()

export default personalAccessTokenModel