import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly otpService: OtpService
    ) { }

    async signup(createUsersDto: CreateUserDto) {
        const { email, password } = createUsersDto;

        const exitingUser = this.usersService.findByEmail(email);
        if (exitingUser)
            throw new Error('user already exits!');

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersService.create({ ...createUsersDto, password: hashedPassword });
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.usersService.findByEmail(email);
        if (!user)
            throw new Error('invalid credential!');

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword)
            throw new Error('password is invalid!');

        const payload = { sub: user.id, email: user.email }
        const token = this.jwtService.sign(payload);

        return token;
    }

    async sendOtp(phonenumber: string): Promise<void> {
        let user = await this.usersService.findByPhonenumber(phonenumber);
        if (!user)
            throw new Error('invalid user');

        const otp = await this.otpService.generateOtpCode(user.phonenumber);
        console.log(`otp: ${otp} phone numer: ${phonenumber}`);
    }

    async verifyOtp(phonenumber: string, otp: string): Promise<string> {
        const isValid = await this.otpService.verifyOtpCode(phonenumber, otp);
        if (!isValid)
            throw new Error('Invalid OTP');

        let user = await this.usersService.findByPhonenumber(phonenumber);
        if (!user) {
            throw new Error('Invalid credentials!');
        }

        const payload = { sub: user.id, phoneNumber: user.phonenumber };
        return this.jwtService.sign(payload);
    }
}
