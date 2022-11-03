import { Knex, knex } from 'knex';

import { CamelCaseKeys } from '../types/utils';
import { toCamelCase } from '../utils/object';

export interface BeerModel {
  id: number;
  name: string;
  created_at: string;
  description: string;
  genre: string;
  updated_at: string;
}

export type BeerSchema = CamelCaseKeys<BeerModel>;
export type BeerPayload = Omit<BeerSchema, 'id' | 'createdAt' | 'updatedAt'>;

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

class Beer {
  public static table = 'beers';

  public static async getAll(): Promise<BeerSchema> {
    return db.select('*').from('beers');
  }

  public static async insertData(data: BeerPayload): Promise<BeerSchema[]> {
    const result = await db.insert(data).into(this.table).returning('*');

    return toCamelCase(result);
  }
}

export default Beer;
