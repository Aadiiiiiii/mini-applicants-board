import { Injectable, NotFoundException } from '@nestjs/common';
import { ApplicantStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantStatusDto } from './dto/update-applicant-status.dto';

@Injectable()
export class ApplicantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createApplicantDto: CreateApplicantDto) {
    return this.prisma.applicant.create({
      data: createApplicantDto,
    });
  }

  async findAll(status?: ApplicantStatus, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where = {
      isDeleted: false,
      ...(status ? { status } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.applicant.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.applicant.count({
        where,
      }),
    ]);

    return {
      data,
      page,
      limit,
      total,
    };
  }

  async updateStatus(id: string, updateApplicantStatusDto: UpdateApplicantStatusDto) {
    const applicant = await this.prisma.applicant.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    return this.prisma.applicant.update({
      where: {
        id,
      },
      data: {
        status: updateApplicantStatusDto.status,
      },
    });
  }

  async softDelete(id: string) {
    const applicant = await this.prisma.applicant.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!applicant) {
      throw new NotFoundException('Applicant not found');
    }

    return this.prisma.applicant.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}

