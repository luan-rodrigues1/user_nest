import { dataSourceOpts } from './../data-source';
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.modulo';
import { GatewayModule } from './gateway/gateway.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            ...dataSourceOpts,
            autoLoadEntities: true,
        }),
        UsersModule,
        AuthModule,
        GatewayModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
