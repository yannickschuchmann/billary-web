import {createActionAsync} from 'redux-act-async';
import {createAction} from 'redux-act';
import * as calls from '../api/auth';

export const configure = createActionAsync('CONFIGURE', calls.configure);
export const authenticate = createActionAsync('AUTHENTICATE', calls.authenticate);
export const emailSignUp = createActionAsync('EMAIL_SIGN_UP', calls.emailSignUp);
export const emailSignIn = createActionAsync('EMAIL_SIGN_IN', calls.emailSignIn);
export const signOut = createActionAsync('EMAIL_SIGN_OUT', calls.signOut);
