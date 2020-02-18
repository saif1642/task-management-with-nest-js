import { Controller } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository:UserRepository
    ){

    }
}
