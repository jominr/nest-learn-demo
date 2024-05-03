import { Body, Controller, Delete, Get, Param, Patch, Post, Query,
  ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// controllers are responsible for handing incoming requests
//  and returning responses to the client. 
// controllers是用来处理请求的。
@Controller('users') // /users
export class UsersController {
    
    // 注入我们的UsersService, 
    constructor(private readonly usersService: UsersService) {}
      
    /* 
      GET /users
      GET /users/:id
      POST /users
      PATCH /users/:id
      DELETE /users/:id
      */
    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
      return this.usersService.findAll(role);
    }
    // 必须放在/:id之前
    @Get('interns') // GET /users/interns
    findAllInterns() {
      return []
    }

    @Get(':id') // GET /users/:id
    // param里要传id, 原先id的类型是string, 这里使用ParseIntPipe转换成了number,

    // pipes: 是中间件，通常两种用途，可以在文档中查看有哪些pipes
    // transformation: transform input data to the desired form. 
    // validation: evaluate input data and if valid, pass it through unchanged; otherwise, throw an exception.  
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.usersService.findOne(id);
    }

    @Post() // POST /users
    // body里要传user, user的类型在后面指定
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
      return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id:number) {
      return this.usersService.delete(+id);
    }


    
}
