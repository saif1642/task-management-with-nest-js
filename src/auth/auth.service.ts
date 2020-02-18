import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository,
        private jwtService:JwtService
    ){

    }
    signUp(authCredentials:AuthCredentialsDto){
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials:AuthCredentialsDto) : Promise<{ accessToken:string }>{
        const username =  await this.userRepository.validateUserPassword(authCredentials);

        if(!username){
            throw new UnauthorizedException("Invalid Credentials");
        }

        const payload = { username };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
