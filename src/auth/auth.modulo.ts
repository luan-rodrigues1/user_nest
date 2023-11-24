import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY, 
            signOptions: {expiresIn: "24h"}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}