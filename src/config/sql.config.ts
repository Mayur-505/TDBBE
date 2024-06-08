import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const sqlConfig: MysqlConnectionOptions = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "",
  "database": "tbd",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entities/*.ts"],
}