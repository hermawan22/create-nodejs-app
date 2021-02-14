import * as typeorm from 'typeorm';
import { UserWithThatEmailAlreadyExistsException } from '@modules/common/auth/exceptions';
import TokenData from '@helpers/interfaces/tokenData.interface';
import CreateUserDto from '@modules/user/dto';
import AuthService from '@modules/common/auth/service';

(typeorm as any).getRepository = jest.fn();

describe('The AuthService', () => {
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const tokenData: TokenData = {
        token: '',
        expiresIn: 1,
      };
      (typeorm as any).getRepository.mockReturnValue({});
      const authenticationService = new AuthService();
      expect(typeof authenticationService.createCookie(tokenData))
        .toEqual('string');
    });
  });
  describe('when registering a user', () => {
    describe('if the email is already taken', () => {
      it('should throw an error', async () => {
        const userData: CreateUserDto = {
          first_name: 'John',
          last_name: 'Doe',
          photo: 'a12123lasdk;l.jpg',
          email: 'john@doe.com',
          password: 'strongPassword123',
        };
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(userData),
        });
        const authenticationService = new AuthService();
        await expect(authenticationService.register(userData))
          .rejects.toMatchObject(new UserWithThatEmailAlreadyExistsException(userData.email));
      });
    });
    describe('if the email is not taken', () => {
      it('should not throw an error', async () => {
        const userData: CreateUserDto = {
          first_name: 'John',
          last_name: 'Doe',
          photo: 'a12123lasdk;l.jpg',
          email: 'john@doe.com',
          password: 'strongPassword123',
        };
        process.env.JWT_SECRET = 'jwt_secret';
        (typeorm as any).getRepository.mockReturnValue({
          findOne: () => Promise.resolve(undefined),
          create: () => ({
            ...userData,
            id: 0,
          }),
          save: () => Promise.resolve(),
        });
        const authenticationService = new AuthService();
        await expect(authenticationService.register(userData))
          .resolves.toBeDefined();
      });
    });
  });
});
