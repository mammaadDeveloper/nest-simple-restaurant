import {Processor, Process} from '@nestjs/bull'
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { SmsService } from '../sms/sms.service';

@Processor('otpQueue')
@Injectable()
export class OtpProccessor{
    constructor(private readonly smsService: SmsService){}

    @Process()
    async handle(job:Job){
        const {phoneNumber, otp} = job.data;

        try{
            await this.smsService.sendSms(phoneNumber, otp);
            console.log(`OTP sent to ${phoneNumber}: ${otp}`);
        }
        catch(er){
            console.error(`Failed to send OTP to ${phoneNumber}: ${er.message}`);
        }
    }
}