import { DataSourceOptions } from "typeorm";

export const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'mini_indexer',
    synchronize: true,
    entities: ['src/modules/kafka/entities/*.ts'],
}