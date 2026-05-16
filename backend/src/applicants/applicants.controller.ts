import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApplicantStatus } from '@prisma/client';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantStatusDto } from './dto/update-applicant-status.dto';

@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantsService.create(createApplicantDto);
  }

  @Get()
  findAll(
    @Query('status') status?: ApplicantStatus,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.applicantsService.findAll(
      status,
      page ? Number(page) : 1,
      limit ? Number(limit) : 10,
    );
  }

  @Patch(':id')
  updateStatus(
    @Param('id') id: string,
    @Body() updateApplicantStatusDto: UpdateApplicantStatusDto,
  ) {
    return this.applicantsService.updateStatus(id, updateApplicantStatusDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.applicantsService.softDelete(id);
  }
}