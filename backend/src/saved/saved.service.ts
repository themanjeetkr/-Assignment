import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedService {
  constructor(private readonly prisma: PrismaService) {}

  async saveCollege(userId: number, collegeId: number) {
    const college = await this.prisma.college.findUnique({
      where: { id: collegeId },
      select: { id: true },
    });

    if (!college) {
      throw new NotFoundException('College not found');
    }

    try {
      const savedCollege = await this.prisma.savedCollege.create({
        data: { userId, collegeId },
        include: { college: true },
      });

      return {
        message: 'College saved successfully',
        data: savedCollege,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('College is already saved');
      }
      throw error;
    }
  }

  async getSavedColleges(userId: number) {
    const savedColleges = await this.prisma.savedCollege.findMany({
      where: { userId },
      include: { college: true },
      orderBy: { createdAt: 'desc' },
    });

    return { data: savedColleges };
  }

  async removeSavedCollege(userId: number, collegeId: number) {
    const savedCollege = await this.prisma.savedCollege.findUnique({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    if (!savedCollege) {
      throw new NotFoundException('Saved college not found');
    }

    await this.prisma.savedCollege.delete({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });

    return { message: 'Saved college removed successfully' };
  }
}
