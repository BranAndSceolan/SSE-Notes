import {AuthModule} from "./auth.module";
import {PasswordChecker} from "./zxcvbn";

export const authModule = new AuthModule()
export const passwordChecker = new PasswordChecker()