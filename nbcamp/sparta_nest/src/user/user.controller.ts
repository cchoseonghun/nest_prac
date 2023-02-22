import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async login() {
    return await this.userService.login('messi', 'not_goat');
  }

  @Post('/signup')
  async createUser() {
    return await this.userService.createUser('messi', 'messi', 'goat');
  }

  @Put('/update')
  updateUser() {
    this.userService.updateUser('messi', 'messi_psg', 'goatgoat');
  }

  // @Post('/login')
  // async login(@Body() body) {
  //   const { userId, password } = body;
  //   return await this.userService.login(userId, password);
  // }

  // @Post('/signup')
  // async createUser(@Body() body) {
  //   const { userId, name, password } = body;
  //   return await this.userService.createUser(userId, name, password);
  // }

  // @Put('/update')
  // updateUser(@Body() body) {
  //   const { userId, name, password } = body;
  //   this.userService.updateUser(userId, name, password);
  // }
}
