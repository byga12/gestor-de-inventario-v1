import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return await this.userRepository.find({
      select: {
        id: true,
        username: true,
        name: true,
        surname: true,
        creation_date: true,
        deletedAt: true,
        role: true,
      },
    });
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ username });
  }

  async addUser(createUserDto: CreateUserDto) {
    const { username, password, name, surname, role } = createUserDto;

    const passwordHash = await hash(password, 10);

    const user = new User(username, passwordHash, name, surname, role);
    return await this.userRepository.insert(user);
  }

  async deleteUser(id: string) {
    const user: User = await this.userRepository.findOneByOrFail({ id });
    return await this.userRepository.softRemove(user);
  }
}
