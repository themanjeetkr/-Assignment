import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetCollegesQueryDto {
  @ApiPropertyOptional({ example: 'engineering' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Delhi' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ example: 100000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minFees?: number;

  @ApiPropertyOptional({ example: 300000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxFees?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}
