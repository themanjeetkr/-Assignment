import { Injectable, NotFoundException } from '@nestjs/common';
import { buildCollegeWhere } from '../common/utils/college-filter.util';
import { getPagination, getPaginationMeta } from '../common/utils/pagination.util';
import { PrismaService } from '../prisma/prisma.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';

@Injectable()
export class CollegesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetCollegesQueryDto) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const where = buildCollegeWhere(query);

    const [colleges, total] = await this.prisma.$transaction([
      this.prisma.college.findMany({
        where,
        skip,
        take: limit,
        orderBy: { rating: 'desc' },
      }),
      this.prisma.college.count({ where }),
    ]);

    return {
      data: colleges,
      meta: getPaginationMeta(page, limit, total),
    };
  }

  async findOne(id: number) {
    const college = await this.prisma.college.findUnique({
      where: { id },
    });

    if (!college) {
      throw new NotFoundException('College not found');
    }

    return college;
  }
}
