import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import * as crypto from 'crypto';

@Injectable()
export class OtpService {
    private redis: Redis;

    constructor(configService: ConfigService) {
        this.redis = new Redis({
            host: configService.get('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT')
        })
    }
    async generateOtpCode(identifier:string): Promise<string>{
        const otp = crypto.randomInt(100000, 999999).toString();
        const ttl = 300;

        await this.redis.set(`otp: ${identifier}`, otp, 'EX', ttl);

        return otp;
    }

    async verifyOtpCode(identifier:string, otp: string): Promise<boolean>{
        const key = `otp: ${identifier}`
        const storedOtp = await this.redis.get(key);

        if (storedOtp !== otp)
            return false;

        await this.redis.del(key);

        return true;
    }
}
