// src/users/usersService.ts
import { getRepository } from 'typeorm';
import UserEntity from '@modules/user/entity'
import { UserInterface } from "@modules/user/interface";

export class UsersService {
  public async get(id: string): Promise<UserInterface> {
    const user = await getRepository(UserEntity).findOne(id)
    return user;
  }
}