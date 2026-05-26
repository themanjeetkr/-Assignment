import { Prisma } from '@prisma/client';

interface CollegeFilters {
  search?: string;
  location?: string;
  minFees?: number;
  maxFees?: number;
  rating?: number;
}

export function buildCollegeWhere(filters: CollegeFilters): Prisma.CollegeWhereInput {
  const where: Prisma.CollegeWhereInput = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { location: { contains: filters.search, mode: 'insensitive' } },
      { overview: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  if (filters.location) {
    where.location = { contains: filters.location, mode: 'insensitive' };
  }

  if (filters.minFees || filters.maxFees) {
    where.fees = {
      gte: filters.minFees,
      lte: filters.maxFees,
    };
  }

  if (filters.rating) {
    where.rating = { gte: filters.rating };
  }

  return where;
}
