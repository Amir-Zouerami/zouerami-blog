import { Client, Pool } from 'pg';

// export const pgClient = new Client({
//   database: 'test',
//   user: 'amirzm',
//   password: '00000000',
// });

export const pool = new Pool({
  user: 'amirzm',
  database: 'test',
  password: '00000000',
});
