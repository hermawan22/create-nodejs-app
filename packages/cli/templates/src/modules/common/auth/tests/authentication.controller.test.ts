import * as request from 'supertest';
import * as typeorm from 'typeorm';
import App from '../../../../app';
import CreateUserDto from '@modules/user/dto';
import AuthRouter from '@modules/common/auth/controller';

(typeorm as any).getRepository = jest.fn();

describe('The AuthRouter', () => {
  describe('POST /api/auth/register', () => {
    describe('if the email is not taken', () => {
      it('response should have the set-cookie header with the Authorization token', () => {
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
        const authenticationController = new AuthRouter('/auth');
        const app = new App([
          authenticationController,
        ]);
        return request(app.getServer())
          .post(`/api/${authenticationController.path}/register`)
          .send(userData)
          .expect('set-cookie', /^Authorization=.+/);
      });
    });
  });
});
