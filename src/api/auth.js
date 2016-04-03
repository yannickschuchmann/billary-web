import Auth from 'j-toker';
import cookie from 'jquery.cookie';
import { API_PATH } from "./index";

const promisify = (req, alwaysResolve = false) => {
  return new Promise((resolve, reject) => req
    .then(resolve)
    .fail(alwaysResolve ? resolve : reject));
}

export const configure = () => promisify(Auth.configure({
  apiUrl: API_PATH,
  storage: 'localStorage',
  passwordResetSuccessUrl: () => `${window.location.origin}/settings/change-password`,
  confirmSuccessUrl: () => `${window.location.origin}/login`
}), true);

export const authenticate = () => promisify(Auth.validateToken());

export const emailSignUp = (user) => promisify(Auth.emailSignUp(user));
export const emailSignIn = (user) => promisify(Auth.emailSignIn(user));

export const signOut = (user) => promisify(Auth.signOut());

export const requestPasswortReset = (mail) => promisify(Auth.requestPasswordReset({email: mail}));
export const updatePassword = (passwords) => promisify(Auth.updatePassword(passwords));
export const deleteAccount = () => promisify(Auth.destroyAccount());
