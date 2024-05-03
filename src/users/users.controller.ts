import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
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
    // param里要传id, id的类型是string
    findOne(@Param('id') id: string) {
      return this.usersService.findOne(+id);
    }

    @Post() // POST /users
    // body里要传user, user的类型在后面指定
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
      return this.usersService.create(user);
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
      return this.usersService.update(+id, userUpdate);
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id:string) {
      return this.usersService.delete(+id);
    }


    
}
