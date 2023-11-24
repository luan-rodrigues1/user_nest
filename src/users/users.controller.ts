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
    UseGuards,
    Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import {
    CreateUserDto,
    ResponseUserDto,
} from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { AuthGuard } from "src/auth/auth.guard";
import { TokenUserRequest } from "src/auth/dto/login.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("User")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(
        @Request() requestData: TokenUserRequest
    ): Promise<User[]> {
        return await this.usersService.findAll(requestData.user.is_adm);
    }

    @Get("/:id")
    @UseGuards(AuthGuard)
    async findOne(
        @Param("id", ParseUUIDPipe) id: string,
        @Request() requestData: TokenUserRequest
    ): Promise<ResponseUserDto> {
        return ResponseUserDto.fromModel(await this.usersService.findOne(
            id,
            requestData.user.sub, 
            requestData.user.is_adm
        ));
    }

    @Put("/:id")
    @UseGuards(AuthGuard)
    async update(
        @Param("id", ParseUUIDPipe) id: string,
        @Body() updateUserDto: UpdateUserDto,
        @Request() requestData: TokenUserRequest, 
    ): Promise<User> {
        return await this.usersService.update(
            id, 
            updateUserDto, 
            requestData.user.sub, 
            requestData.user.is_adm
        );
    }

    @Delete("/:id")
    @UseGuards(AuthGuard)
    @HttpCode(204)
    async remove(
        @Param("id", ParseUUIDPipe) id: string, 
        @Request() requestData: TokenUserRequest
    ): Promise<void> {
        return await this.usersService.remove(
            id,
            requestData.user.sub, 
            requestData.user.is_adm
        );
    }
}
