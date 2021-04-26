//@ts-nocheck
import userActivityModel from "./UserActivity.ts";
import BaseModel from "./BaseModel.ts";
import ICollection from "../contracts/ICollection.ts";

export interface UserSchema {
  _id?: { $oid: string };
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  dateCreated: Date;
  dateUpdated: Date;
  dateLastLogin: Date
}


export class UserModel extends BaseModel {
  collection = "users"
  async format(model: UserSchema): { [p: string]: any } {
    const userActivitiesCollection = userActivityModel.getCollection();
    return Object.assign(model, {
      dateCreated: new Date(model.dateCreated).toISOString(),
      dateUpdated: new Date(model.dateUpdated).toISOString(),
      dateLastLogin: new Date(model.dateLastLogin).toISOString(),

      activities: userActivityModel.formatter.bind(this, await userActivitiesCollection.find({ user: model._id }).toArray()),
    });
  }

  getCollection(): ICollection<UserSchema> {
    if (this.connection)
      return this.connection.collection(this.collection)
    //@ts-ignore
    return window.db.collection(this.collection)
  }
}
const userModel = new UserModel();
export async function user(userId) {
  return userModel.getCollection().findOne({ _id: userId }).then(user => userModel.formatter(user))
}

export default userModel