import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDto {
    @IsEmail()
    name: string;

    @IsNotEmpty()
    password: string
}