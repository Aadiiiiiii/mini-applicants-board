import { IsEnum } from 'class-validator';
import { ApplicantStatus } from '@prisma/client';

export class UpdateApplicantStatusDto {
  @IsEnum(ApplicantStatus)
  status: ApplicantStatus;
}