import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, FindUuidParams } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(":id")
    async findOne(@Param() id: FindUuidParams): Promise<User> {
        return await this.usersService.findOne(id);
    }

    @Put(":id")
    async update(
        @Param() id: FindUuidParams,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        console.log(id);
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete(":id")
    @HttpCode(204)
    async remove(@Param() id: FindUuidParams): Promise<void> {
        return await this.usersService.remove(id);
    }
}
