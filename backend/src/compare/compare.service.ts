import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompareService {
  constructor(private readonly prisma: PrismaService) {}

  async compare(ids: number[]) {
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length !== 2) {
      throw new BadRequestException('Please provide two different college ids');
    }

    const colleges = await this.prisma.college.findMany({
      where: { id: { in: uniqueIds } },
      select: {
        id: true,
        name: true,
        fees: true,
        rating: true,
        placements: true,
        location: true,
      },
    });

    if (colleges.length !== 2) {
      throw new NotFoundException('One or more colleges were not found');
    }

    return { colleges };
  }
}
