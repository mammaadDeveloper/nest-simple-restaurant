import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller({
    path:'auth',
    version:'1'
})
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto){
        try{
            const user = await this.authService.signup(createUserDto);
            return {
                message: "User registered successfully!",
                user
            };
        }
        catch(er){
            throw new HttpException(er.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signin')
    async signin(@Body() loginDto: LoginDto){
        try{
            const token = await this.authService.login(loginDto);
            return {
                message: 'Login successfully!',
                token
            };
        }
        catch(er){
            throw new HttpException(er.message, HttpStatus.UNAUTHORIZED);
        }
    }
}
