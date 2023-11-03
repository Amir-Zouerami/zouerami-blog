// ------------------ HELPER ----------------
type anyObj = { [key: string]: string | number };

/**
 * Potential Errors Which Might happen In The Sign-up Form
 */

export interface SignupErrors {
  password?: string[] | undefined;
  email?: string[] | undefined;
  username?: string[] | undefined;
}

/**
 * Potential Errors Which Might happen In The Sign-in Form
 */

export interface SigninErrors {
  identifier?: string[] | undefined;
  password?: string[] | undefined;
}

/**
 * Type for A Registered User On DB
 */

export interface AuthenticatedUser {
  id?: string;
  // name?: string;
  email: string;
  username: string;
  // password: string;
  // passwordConfirm: string;
  emailVisibility?: boolean;
  verified?: boolean;
  avatar?: string;
}

/**
 * General Shape For Postgresql Errors -- NOT ACCURATE AT ALL LMAO
 */
export interface PGError {
  length: number;
  name: string;
  severity: string;
  code: string;
  constraint: string;
  detail?: string;
  schema?: string;
  table?: string;
  file?: string;
  line?: string;
  routine?: string;
  [key: string]: any;
}

type PGErrorConstraint = Partial<PGError> & { constraint: string };

export const isPGConstraintError = (e: anyObj): e is PGErrorConstraint => {
  return typeof e === 'object' && 'constraint' in e;
};

/**
 * General Shape For Signup Error
 */
// export interface PBError {
//   url: string;
//   status: number;
//   response: DataOrResponse;
//   isAbort: boolean;
//   originalError: OriginalError;
//   name: string;
//   [key: string]: any;
// }

export interface PBSignupError {
  url: string;
  status: number;
  response: DataOrResponse;
  isAbort: boolean;
  originalError: OriginalError;
  name: string;
  [key: string]: any;
}
interface DataOrResponse {
  code: number;
  message: string;
  data: errorData;
}

interface errorData {
  email?: fieldError;
  username?: fieldError;
  password?: fieldError;
}

interface fieldError {
  code: string;
  message: string;
}

interface OriginalError {
  url: string;
  status: number;
  data: DataOrResponse;
}

/**
 * FormData Type
 */
export type formDataObj = Record<string, FormDataEntryValue>;
