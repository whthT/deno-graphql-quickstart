//@ts-nocheck
import {user, UserSchema} from "./User.ts";
import UserActivities from "../consts/UserActivities.ts";
import BaseModel from "./BaseModel.ts";
import ICollection from "../contracts/ICollection.ts";

export interface UserActivitySchema {
  _id?: { $oid: string };
  ip: string;
  dateCreated: Date;
  dateUpdated: Date;
  type: UserActivities,
  user: UserSchema;
}

export class UserActivityModel extends BaseModel {
  collection = "userActivities"
  format(model: UserActivitySchema): { [p: string]: any } {
    return Object.assign(model, {
      type: UserActivities[model.type],
      ip: model.ip,
      user: user.bind(this, model.user),
    });
  }

  getCollection(): ICollection<UserActivitySchema> {
    if (this.connection)
      return this.connection.collection(this.collection)
    //@ts-ignore
    return window.db.collection(this.collection)
  }
}

const userActivityModel = new UserActivityModel()

export default userActivityModel