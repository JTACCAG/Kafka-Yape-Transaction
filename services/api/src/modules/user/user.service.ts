import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: { id: id },
    });
    const updatedUser = Object.assign(userExist, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string) {
    return await this.userRepository.softDelete(id);
  }
}
