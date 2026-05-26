import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true },
    });

    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  private buildAuthResponse(user: { id: number; name: string; email: string }) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { accessToken, user };
  }
}
