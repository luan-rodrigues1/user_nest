import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv"

dotenv.config()

export const dataSourceOpts :DataSourceOptions = {
    type: "mysql",
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    logging: true,
    migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
    synchronize: false,
}

export const connectionSource = new DataSource(dataSourceOpts);