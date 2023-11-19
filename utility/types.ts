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

/**
 * Blog Post Data Type
 */
export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  article_version: number;
  viewcount: number;
  comments: string[];
  post_categories: string[];
  skill_level: 'مبتدی' | 'متوسط' | 'پیشرفته';
  cover: string;
  article_headlines: string;
  summary: string;
  content: string;
  collectionId: string;
  created: string;
  updated: string;
  expand: Expand;
}

/**
 * A Single User
 */
export interface User {
  avatar?: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: false;
  id: string;
  updated: string;
  username: string;
  verified: boolean;
}

export interface BlogPostHeaderProps {
  title: string;
  article_version: number;
  skill_level: 'مبتدی' | 'متوسط' | 'پیشرفته';
  categories: PostCategory[];
  article_headlines: string;
  created: string;
  updated: string;
  viewcount: number;
}

/**
 * Pocketbase Post Expand Relation
 */
interface Expand {
  post_categories: PostCategory[];
  comments?: Comment[] | null;
}

/**
 * Post Categories
 */
export interface PostCategory {
  id: string;
  category: string;
  collectionId: string;
  collectionName: string;
  createdAt: string;
  UpdatedAt: string;
}

export interface PostCategories {
  post_categories: PostCategory[];
}

/**
 * Post Comments
 */
export interface Comment {
  id: string;
  collectionId: string;
  collectionName: string;
  comment_content: string;
  post_id: string;
  user_id: string;
  updated: string;
  created: string;
  expand?: {
    user_id: User;
  };
}

/**
 * Comments Fetched From API
 */
export interface CommentsAPIData {
  ok: boolean;
  totalPages: number;
  data: { items: Comment[] };
}

/**
 * Search Parameters
 */
export interface searchParams {
  [key: string]: string | string[] | undefined;
}

/**
 * PaginationProps
 */
export interface PaginationProps {
  page: number;
  // perPage: number;
  // totalItems: number;
  totalPages: number;
}
