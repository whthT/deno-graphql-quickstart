import UserActivities from "../consts/UserActivities.ts";
import {Bson} from "https://deno.land/x/mongo@v0.22.0/mod.ts";
import userActivityModel from "../Models/UserActivity.ts";

export default function assignUserActivity(
  user: any,
  activity: UserActivities
) {
  const collection = userActivityModel.getCollection();

  collection.insertOne({
    // @ts-ignore
    user: Bson.ObjectId.isValid(user._id) ? user._id : Bson.ObjectId(user._id),
    type: activity,
    //@ts-ignore
    ip: window.currentRequest.ip,
    dateCreated: new Date(),
    dateUpdated: new Date()
  });
}
