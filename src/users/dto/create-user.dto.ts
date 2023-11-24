import { User } from "./../entities/user.entity";
import { OmitType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, plainToInstance } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty()
    password: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        required: false
    })
    is_adm: boolean
}
export class ResponseUserDto extends OmitType(CreateUserDto, ["password"]) {
    @IsNotEmpty()
    @Exclude()
    password: string;
    static fromModel(user: User) {
        return plainToInstance(ResponseUserDto, user);
    }
}