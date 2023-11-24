import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto, tokenResponse } from "./dto/login.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    @HttpCode(200)
    async login(@Body() loginData: loginDto): Promise<tokenResponse> {
        return await this.authService.login(loginData)
    }

}