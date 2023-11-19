import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { ConfigModule } from "@nestjs/config";
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST!,
            port: parseInt(process.env.DB_PORT!),
            username: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            database: process.env.DB_DATABASE!,
            synchronize: true,
            logging: true,
            entities: [User],
        }),
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
