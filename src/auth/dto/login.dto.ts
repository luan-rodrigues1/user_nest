import { IsEmail, IsJWT, IsNotEmpty } from "class-validator";

export class loginDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string
}

export class tokenResponse {
    @IsJWT()
    access_token: string
}