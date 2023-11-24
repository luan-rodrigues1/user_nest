import { IsBoolean, IsEmail, IsJWT, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

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
export class TokenUserRequest {
    user: tokenUserInfo
}
export class tokenUserInfo {
    @IsUUID("all")
    sub: string

    @IsBoolean()
    is_adm: boolean

    @IsNumber()
    iat: number

    @IsNumber()
    exp: number
}