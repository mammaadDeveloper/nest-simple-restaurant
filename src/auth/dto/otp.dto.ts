import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class SendOtpDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phonenumber: string;
}

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber: string;

    @IsNotEmpty()
    otp: string;
}