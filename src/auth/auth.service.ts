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
} from "@nestjs/common";
import { Injectable } from '@nestjs/common';
import { loginDto } from "./dto/login.dto";
import { User } from "src/users/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async login(login: loginDto): Promise<any> {
        return 
    }
    
}