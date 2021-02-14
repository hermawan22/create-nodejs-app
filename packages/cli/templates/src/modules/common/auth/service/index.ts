import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { UserWithThatEmailAlreadyExistsException } from '@modules/common/auth/exceptions';
import DataStoredInToken from '@helpers/interfaces/dataStoredInToken';
import TokenData from '@helpers/interfaces/tokenData.interface';
import CreateUserDto from '@modules/user/dto';
import User from '@modules/user/entity';

class AuthenticationService {
  public async register(userData: CreateUserDto) {
    if (
      await getRepository(User).findOne({ email: userData.email })
    ) {
      throw new UserWithThatEmailAlreadyExistsException(userData.email);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = getRepository(User).create({
      ...userData,
      password: hashedPassword,
    });
    await getRepository(User).save(user);
    user.password = undefined;
    const tokenData = this.createToken(user);
    const cookie = this.createCookie(tokenData);
    return {
      cookie,
      user,
    };
  }
  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    const secret = process.env.JWT_SECRET;
    const dataStoredInToken: DataStoredInToken = {
      id: user.id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }
}

export default AuthenticationService;
