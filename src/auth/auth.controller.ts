import { Controller, Post, Body } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService:AuthService
    ){

    }

    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto) : Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }
    
}
