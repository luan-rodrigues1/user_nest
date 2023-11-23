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
import { UsersService } from "./users.service";
import {
    CreateUserDto,
    ResponseUserDto,
} from "./dto/create-user.dto";
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

    @Get("/:id")
    async findOne(
        @Param("id", ParseUUIDPipe) id: string,
    ): Promise<ResponseUserDto> {
        return ResponseUserDto.fromModel(await this.usersService.findOne(id));
    }

    @Put("/:id")
    async update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        console.log(id);
        return await this.usersService.update(id, updateUserDto);
    }

    @Delete("/:id")
    @HttpCode(204)
    async remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
        return await this.usersService.remove(id);
    }
}
