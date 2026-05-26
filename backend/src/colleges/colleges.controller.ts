import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CollegesService } from './colleges.service';
import { GetCollegesQueryDto } from './dto/get-colleges-query.dto';

@ApiTags('Colleges')
@Controller('colleges')
export class CollegesController {
  constructor(private readonly collegesService: CollegesService) {}

  @Get()
  @ApiOkResponse({
    description: 'Paginated colleges list with search and filters.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'Delhi Technical University',
            location: 'Delhi',
            fees: 220000,
            rating: 4.5,
            overview: 'A public technical university...',
            placements: 'Average package around 12 LPA...',
            courses: ['B.Tech Computer Science'],
          },
        ],
        meta: { page: 1, limit: 10, total: 1, totalPages: 1 },
      },
    },
  })
  findAll(@Query() query: GetCollegesQueryDto) {
    return this.collegesService.findAll(query);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'College details by id.' })
  @ApiNotFoundResponse({ description: 'College not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collegesService.findOne(id);
  }
}
