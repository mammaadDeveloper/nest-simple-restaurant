import { Controller, UseGuards } from '@nestjs/common';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Controller('orders')
@UseGuards(JwtStrategy)
export class OrdersController {}
