import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import {v4 as uuid} from 'uuid';
import {hashSync as bcryptHashSync} from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = []

    create(newUser:UserDto){
        //essa lib cria um novo id, nao quero que o user possa mudar seu id
        newUser.id = uuid();
        //10 é o numero de vezes que vai executar a funcao.
        newUser.password = bcryptHashSync(newUser.password, 10); 
        this.users.push(newUser);
        console.log(newUser);
    }

    findByUsername(username: string): UserDto | null {
        return this.users.find(user => user.username === username)
    }
}
