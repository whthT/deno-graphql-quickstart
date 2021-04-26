import UserSchema from "../Models/User.ts"

export default interface ICtxAuthInfo {
  auth: boolean;
  user: UserSchema | null;
  attributes: string[];
  token?: string | null;
}
