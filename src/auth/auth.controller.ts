import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() loginData: loginDto): Promise<any> {
        return await this.authService.login(loginData)
    }

}