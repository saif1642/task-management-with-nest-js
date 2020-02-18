import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){

    }
    signUp(authCredentials:AuthCredentialsDto){
        return this.userRepository.signUp(authCredentials);
    }

    async signIn(authCredentials:AuthCredentialsDto){
        const result = await this.userRepository.validateUserPassword(authCredentials);
        console.log(result);
    }
}
