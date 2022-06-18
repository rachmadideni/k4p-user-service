import { DataSource } from 'typeorm';

export const ds = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/entity/*.ts'],
  logging: process.env.MODE === 'dev',
  synchronize: process.env.MODE === 'dev',
});
