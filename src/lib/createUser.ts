import IRegisterParameters from "../contracts/IRegisterInputParameters.ts";
import userModel from "../Models/User.ts";
import {hash} from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import assignUserActivity from "./assignUserActivity.ts";
import UserActivities from "../consts/UserActivities.ts";
import ucwords from "./ucwords.ts";

export default async function createUser(input: IRegisterParameters) {
  const collection = userModel.getCollection();
  const insertId = await collection.insertOne({
    firstname: ucwords(input.firstname),
    lastname: ucwords(input.lastname),
    email: input.email.toLowerCase(),
    password: await hash(input.password),
    dateCreated: new Date(),
    dateUpdated: new Date(),
    dateLastLogin: new Date(),

  });

  const user = await collection.findOne({ _id: insertId });
  await assignUserActivity(user, UserActivities.REGISTER);
  return user
}
