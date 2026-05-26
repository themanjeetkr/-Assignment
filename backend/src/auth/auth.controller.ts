import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOkResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        accessToken: 'jwt-token',
        user: { id: 1, name: 'Manjeet Singh', email: 'manjeet@example.com' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Email already exists or validation failed.' })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User logged in successfully.',
    schema: {
      example: {
        accessToken: 'jwt-token',
        user: { id: 1, name: 'Manjeet Singh', email: 'manjeet@example.com' },
      },
    },
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
