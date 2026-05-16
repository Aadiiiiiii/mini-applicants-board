import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApplicantStatus } from '@prisma/client';

export class CreateApplicantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsOptional()
  @IsEnum(ApplicantStatus)
  status?: ApplicantStatus;
}

