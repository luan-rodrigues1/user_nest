import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { CreateUserDto, FindUuidParams } from "./dto/create-user.dto";
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

    async create(createUserDto: CreateUserDto): Promise<User> {
        const emailExists = await this.usersRepo.findOne({
            where: { email: createUserDto.email },
        });

        if (emailExists) {
            throw new ConflictException("Email already used");
        }
        const createUser = this.usersRepo.create(createUserDto);
        await this.usersRepo.save(createUser);
        return createUser;
    }

    async findAll(): Promise<User[]> {
        const listUsers = await this.usersRepo.find();
        return listUsers;
    }

    async findOne(id: FindUuidParams) {
        const searchUser = await this.usersRepo.findOne({
            where: { id: id.id },
        });

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }
        return searchUser;
    }

    async update(
        id: FindUuidParams,
        updateUserDto: UpdateUserDto,
    ): Promise<User> {
        const userIdExists = await this.usersRepo.findOne({
            where: { id: id.id },
        });

        if (!userIdExists) {
            throw new NotFoundException("User not found");
        }

        if (updateUserDto.email) {
            const emailExists = await this.usersRepo.findOne({
                where: { email: updateUserDto.email },
            });

            if (emailExists && emailExists.email !== userIdExists.email) {
                throw new ConflictException("Email already used");
            }
        }

        await this.usersRepo.update(id.id, updateUserDto);
        const searchUserUpdate = await this.usersRepo.findOne({
            where: { id: id.id },
        });

        return searchUserUpdate;
    }

    async remove(id: FindUuidParams): Promise<void> {
        const searchUser = await this.usersRepo.findOne({
            where: { id: id.id },
        });

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }

        await this.usersRepo.remove(searchUser);
    }
}
