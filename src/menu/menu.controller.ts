import { Controller, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Controller('menu')
@UseGuards(JwtStrategy)
export class MenuController {}
