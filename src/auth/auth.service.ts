import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) { }

    async signup(createUsersDto: CreateUserDto) {
        const { email, password } = createUsersDto;

        const exitingUser = this.usersService.findByEmail(email);
        if (exitingUser)
            throw new Error('user already exits!');

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usersService.create({ ...createUsersDto, password: hashedPassword });
    }

    async login(loginDto: LoginDto){
        const {email, password} = loginDto;

        const user = await this.usersService.findByEmail(email);
        if(!user)
            throw new Error('invalid credential!');

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword)
            throw new Error('password is invalid!');

        const payload = {sub: user.id, email: user.email}
        const token = this.jwtService.sign(payload);

        return token;
    }
}
