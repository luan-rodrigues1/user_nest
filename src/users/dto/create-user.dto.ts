import { User } from "./../entities/user.entity";
import { OmitType } from "@nestjs/mapped-types";
import { Exclude, plainToInstance } from "class-transformer";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
export class ResponseUserDto extends OmitType(CreateUserDto, ["password"]) {
    @IsNotEmpty()
    @Exclude()
    password: string;
    static fromModel(user: User) {
        return plainToInstance(ResponseUserDto, user);
    }
}