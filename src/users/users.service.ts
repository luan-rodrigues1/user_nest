import {
    ConflictException,
    Injectable,
    NotFoundException,
    ForbiddenException
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

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

        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        const createUser = this.usersRepo.create(createUserDto);
        await this.usersRepo.save(createUser);

        const searchUser = await this.usersRepo.findOne({
            where: { id: createUser.id },
            select: ["id", "name", "email", "is_adm", "created_at", "updated_at"],
        });
        return searchUser;
    }

    async findAll(tokenUserIsAdm: boolean): Promise<User[]> {

        if (!tokenUserIsAdm) {
            throw new ForbiddenException("admin users only")
        }
        const listUsers = await this.usersRepo.find({
            select: ["id", "name", "email", "is_adm", "created_at", "updated_at"],
        });
        return listUsers;
    }

    async findOne(
        id: string,
        tokenUserId: string,
        tokenUserIsAdm: boolean
    ): Promise<User> {
        const searchUser = await this.usersRepo.findOne({
            where: { id: id },
        });

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }

        if (!tokenUserIsAdm && searchUser.id !== tokenUserId) {
            throw new ForbiddenException("Only the user or an administrator can update")
        }

        return searchUser;
    }

    async update(
        id: string,
        updateUserDto: UpdateUserDto,
        tokenUserId: string,
        tokenUserIsAdm: boolean
    ): Promise<User> {
        const userIdExists = await this.usersRepo.findOne({
            where: { id: id },
        });

        if (!userIdExists) {
            throw new NotFoundException("User not found");
        }

        if (!tokenUserIsAdm && userIdExists.id !== tokenUserId) {
            throw new ForbiddenException("Only the user or an administrator can update")
        }

        if (updateUserDto.email) {
            const emailExists = await this.usersRepo.findOne({
                where: { email: updateUserDto.email },
            });

            if (emailExists && emailExists.email !== userIdExists.email) {
                throw new ConflictException("Email already used");
            }
        }

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(
                updateUserDto.password,
                10,
            );
        }

        await this.usersRepo.update(id, updateUserDto);
        const searchUserUpdate = await this.usersRepo.findOne({
            where: { id: id },
            select: ["id", "name", "email", "is_adm", "created_at", "updated_at"],
        });

        return searchUserUpdate;
    }

    async remove(
        id: string,
        tokenUserId: string,
        tokenUserIsAdm: boolean
    ): Promise<void> {
        const searchUser = await this.usersRepo.findOne({
            where: { id: id },
        });

        if (!tokenUserIsAdm && searchUser.id !== tokenUserId) {
            throw new ForbiddenException("Only the user or an administrator can update")
        }

        if (!searchUser) {
            throw new NotFoundException("User not found");
        }

        await this.usersRepo.remove(searchUser);
    }
}
