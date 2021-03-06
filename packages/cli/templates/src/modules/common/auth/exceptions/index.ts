import HttpException from '@helpers/exceptions/HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `User with email ${email} already exists`);
  }
}

export { UserWithThatEmailAlreadyExistsException };
