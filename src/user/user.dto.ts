import { BusinessDto } from "src/business/business.dto";

export class UserDto {
    name:string;
    email:string;
    password:string;
}

export class RegisterDto{ 
    user:UserDto
    business:BusinessDto
}