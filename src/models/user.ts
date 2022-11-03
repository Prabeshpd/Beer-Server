import { Knex, knex } from 'knex';
import UserInfo from '../types/user';
import { CamelCaseKeys } from '../types/utils';
import { toCamelCase } from '../utils/object';

export interface UserModel {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  isActive: boolean;
  updatedAt: string;
}

export type UserSchema = CamelCaseKeys<UserModel>;
export type UserPayload = Omit<UserSchema, 'id' | 'createdAt' | 'updatedAt'>;

const dbConfig = {
  client: 'mssql',
  connection: {
    server: 'localhost',
    port: 1433,
    user: 'sa',
    database: 'beer',
    password: 'Admin@1234'
  }
};

const db: Knex = knex(dbConfig);

class User {
  public static table = 'users';

  public static async getAll() {
    return db.select('*').from('users');
  }

  public static async insertData(data: UserPayload) {
    const result = await db.insert(data).into(this.table).returning('*');

    return result;
  }

  public static async fetchByEmail(email: string): Promise<UserInfo | null> {
    const [userData] = await db.select('*').from('users').where('is_active', 1).andWhere('email', email);

    if (!userData) {
      return null;
    }

    return {
      ...toCamelCase(userData)
    } as UserInfo;
  }
}

export default User;
