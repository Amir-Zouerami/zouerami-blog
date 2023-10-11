/**
 * Potential Errors Which Might happen In The Sign-up Form
 */

export interface SignupErrors {
  password?: string[] | undefined;
  email?: string[] | undefined;
  name?: string[] | undefined;
}

/**
 * FormData Type
 */
export type formDataObj = Record<string, FormDataEntryValue>;
