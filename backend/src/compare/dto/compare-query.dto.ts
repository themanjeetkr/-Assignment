import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInt, Min } from 'class-validator';

export class CompareQueryDto {
  @ApiProperty({
    example: [1, 2],
    description: 'Pass as /compare?id=1&id=2',
    isArray: true,
  })
  @Transform(({ value }) => {
    const values = Array.isArray(value) ? value : [value];
    return values.map((id) => Number(id));
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsInt({ each: true })
  @Min(1, { each: true })
  id: number[];
}
