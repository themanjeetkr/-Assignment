import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompareService } from './compare.service';
import { CompareQueryDto } from './dto/compare-query.dto';

@ApiTags('Compare Colleges')
@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get()
  @ApiOkResponse({
    description: 'Compares two colleges by fees, rating, placements, and location.',
    schema: {
      example: {
        colleges: [
          {
            id: 1,
            name: 'Delhi Technical University',
            fees: 220000,
            rating: 4.5,
            placements: 'Average package around 12 LPA...',
            location: 'Delhi',
          },
        ],
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Exactly two college ids are required.' })
  compare(@Query() query: CompareQueryDto) {
    return this.compareService.compare(query.id);
  }
}
