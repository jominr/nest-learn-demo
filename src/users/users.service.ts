import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// providers, 大多数情况是services, 还有可能是
// repositories, factories, helper, and so on. 
// the main idea of a provider is that it can be injected as a dependency. 

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "Sincere@april.biz",
      "role": "INTERN",
    },
    {
      "id": 2,
      "name": "Leanne Graham2",
      "email": "Sincere2@april.biz",
      "role": "ENGINEER",
    },
    {
      "id": 3,
      "name": "Leanne Graham3",
      "email": "Sincere3@april.biz",
      "role": "INTERN",
    },
    {
      "id": 4,
      "name": "Leanne Graham4",
      "email": "Sincere4@april.biz",
      "role": "ADMIN",
    },
    {
      "id": 5,
      "name": "Leanne Graham5",
      "email": "Sincere5@april.biz",
      "role": "ENGINEER",
    },
    {
      "id": 6,
      "name": "Leanne Graham6",
      "email": "Sincere6@april.biz",
      "role": "ADMIN",
    },
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter(user => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id) // id从大到小排
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id) {
        return {...user, ...updateUserDto}
      }
      return {...user}
    })
    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter(user => user.id !== id);
    return removedUser;
  }
}
