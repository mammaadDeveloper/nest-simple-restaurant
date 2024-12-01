import { Body, Controller, HttpException, HttpStatus, Post, Version } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto, VerifyOtpDto } from './dto/otp.dto';

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.authService.signup(createUserDto);
            return {
                message: "User registered successfully!",
                user
            };
        }
        catch (er) {
            throw new HttpException(er.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('signin')
    async signin(@Body() loginDto: LoginDto) {
        try {
            const token = await this.authService.login(loginDto);
            return {
                message: 'Login successfully!',
                token
            };
        }
        catch (er) {
            throw new HttpException(er.message, HttpStatus.UNAUTHORIZED);
        }
    }

    @Post('send-otp')
    @Version('2')
    async sendOtpCode(@Body() sendOtpDto: SendOtpDto) {
        try {
            await this.authService.sendOtp(sendOtpDto.phonenumber);
            return { message: "OTP sent successfull!" }
        }
        catch (er) {
            throw new HttpException(er.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('verify-otp')
    @Version('2')
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        try {
            const token = this.authService.verifyOtp(verifyOtpDto.phoneNumber, verifyOtpDto.otp);
            return { message: "Login successfully!", token  }
        }
        catch (er) {
            throw new HttpException(er.message, HttpStatus.UNAUTHORIZED)
        }
    }
}
