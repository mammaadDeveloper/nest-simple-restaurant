import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService: ConfigService)=>({
        secret:configService.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:'1h'
        }
      })
    }),
    OtpModule
  ],
  providers: [AuthService, UsersService, OtpService],
  controllers: [AuthController]
})
export class AuthModule {}
