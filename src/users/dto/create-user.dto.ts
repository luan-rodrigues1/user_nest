import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
export class FindUuidParams {
    @IsUUID()
    id: string;
}
