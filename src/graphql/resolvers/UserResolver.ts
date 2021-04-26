import { compare } from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { IInputParameter } from "../../contracts/IParameter.ts";
import createWebToken from "../../lib/createWebToken.ts";
import assignUserActivity from "../../lib/assignUserActivity.ts";
import UserActivities from "../../consts/UserActivities.ts";
import IRegisterParameters from "../../contracts/IRegisterInputParameters.ts";
import createUser from "../../lib/createUser.ts";
import requestPrequalification from "../../lib/requestPrequalification.ts";
import isValidEmail from "../../lib/isValidEmail.ts";
import { AuthContext } from "../../lib/GraphQLAuthContext.ts";
import userModel from "../../Models/User.ts";

interface ILoginParameters {
  email: string;
  password: string;
}

export default {
  Query: {
    async userMe(_: any, {}, ctx: AuthContext): Promise<any> {
      requestPrequalification(ctx);
      return userModel.formatter(ctx.user);
    },
  },
  Mutation: {
    async register(
      _: any,
      params: IInputParameter<IRegisterParameters>,
      ctx: AuthContext
    ) {
      if (ctx.isAuth()) {
        throw new Error("Already authenticated.");
      }

      if (!isValidEmail(params.input.email)) {
        throw new Error("Please enter a valid email address.");
      }

      params.input.email = params.input.email.toLowerCase();

      const users = userModel.getCollection();
      const isExists = await users.findOne({ email: params.input.email });
      if (isExists) {
        throw new Error("User email already exists.");
      }
      const user = await createUser(params.input);

      return {
        token: await createWebToken({ user }),
        user: await userModel.formatter(user),
      };
    },
    async login(
      _: any,
      params: IInputParameter<ILoginParameters>,
      ctx: AuthContext
    ) {
      if (ctx.isAuth()) {
        throw new Error("Already authenticated.");
      }
      const users = userModel.getCollection();
      const user = await users.findOne({ email: params.input.email });
      if (!user || !(await compare(params.input.password, user.password))) {
        throw new Error("Email or password is invalid.");
      }
      assignUserActivity(user, UserActivities.LOGIN);
      return {
        token: createWebToken({ user: user }),
        user: userModel.formatter(user),
      };
    },
  },
};
