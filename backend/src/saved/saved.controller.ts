import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticatedUser, CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { SaveCollegeDto } from './dto/save-college.dto';
import { SavedService } from './saved.service';

@ApiTags('Saved Colleges')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Post()
  @ApiCreatedResponse({ description: 'College saved successfully.' })
  @ApiConflictResponse({ description: 'College is already saved.' })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid JWT token.' })
  saveCollege(@CurrentUser() user: AuthenticatedUser, @Body() saveCollegeDto: SaveCollegeDto) {
    return this.savedService.saveCollege(user.id, saveCollegeDto.collegeId);
  }

  @Get()
  @ApiOkResponse({
    description: 'Authenticated user saved colleges.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            college: {
              id: 1,
              name: 'Delhi Technical University',
              location: 'Delhi',
              fees: 220000,
              rating: 4.5,
            },
          },
        ],
      },
    },
  })
  getSavedColleges(@CurrentUser() user: AuthenticatedUser) {
    return this.savedService.getSavedColleges(user.id);
  }

  @Delete(':collegeId')
  @ApiOkResponse({ description: 'Saved college removed successfully.' })
  @ApiNotFoundResponse({ description: 'Saved college not found.' })
  removeSavedCollege(
    @CurrentUser() user: AuthenticatedUser,
    @Param('collegeId', ParseIntPipe) collegeId: number,
  ) {
    return this.savedService.removeSavedCollege(user.id, collegeId);
  }
}
