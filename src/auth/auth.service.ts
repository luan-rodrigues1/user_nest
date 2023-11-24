import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpCode,
    ParseUUIDPipe,
    UnauthorizedException,
} from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { loginDto, tokenResponse } from "./dto/login.dto";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { compare } from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(login: loginDto): Promise<tokenResponse> {
        const searchEmail = await this.userRepo.findOne({
            where: { email: login.email}
        })

        if (!searchEmail) {
            throw new UnauthorizedException("Email or password invalid")
        }

        const passwordMatch = await compare(login.password, searchEmail.password)

        if(!passwordMatch) {
            throw new UnauthorizedException("Email or password invalid")
        }

        const payload = { sub: searchEmail.id, id: searchEmail.id}

        return {access_token: await this.jwtService.signAsync(payload)}
    }
    
}