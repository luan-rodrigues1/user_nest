import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.PGHOST!,
            port: parseInt(process.env.PGPORT!),
            username: process.env.PGUSER!,
            password: process.env.PGPASSWORD!,
            database: process.env.PGDATABASE!,
            synchronize: false,
            logging: true,
            entities: [__dirname + "/**/*.entity{.ts,.js}"],
            migrations: [__dirname, "./migrations/**{.ts,.js}"],
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
