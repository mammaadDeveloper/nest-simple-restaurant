import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { BullModule } from '@nestjs/bullmq';
import { SmsService } from './sms/sms.service';

@Module({
  imports:[
    BullModule.registerQueue({
      name:'otpQueue'
    })
  ],
  providers: [OtpService, SmsService],
  exports:[OtpService]
})
export class OtpModule {}
