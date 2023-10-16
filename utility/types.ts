// ------------------ HELPER ----------------
type anyObj = { [key: string]: string | number };

/**
 * Potential Errors Which Might happen In The Sign-up Form
 */

export interface SignupErrors {
  password?: string[] | undefined;
  email?: string[] | undefined;
  name?: string[] | undefined;
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
 * FormData Type
 */
export type formDataObj = Record<string, FormDataEntryValue>;
