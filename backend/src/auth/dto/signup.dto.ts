import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'Manjeet Singh' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'manjeet@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongPass123' })
  @IsString()
  @MinLength(6)
  password: string;
}
