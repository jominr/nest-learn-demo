import { CreateUserDto } from "./create-user.dto"; 
// 部分
import { PartialType } from "@nestjs/mapped-types";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
}