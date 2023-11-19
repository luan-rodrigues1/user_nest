import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto) {
        console.log("teste", createUserDto);
        return "This action adds a new user luanzin";
    }

    findAll() {
        return `This action returns all users`;
    }

    findOne(id: string) {
        return `This action returns a #${id} user`;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        console.log("teste", updateUserDto);
        return `This action updates a #${id} user`;
    }

    remove(id: string) {
        return `This action removes a #${id} user`;
    }
}
