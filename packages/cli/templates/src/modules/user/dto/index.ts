import { IsString } from 'class-validator';

class CreateUserDto {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsString()
  public photo: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

}

export default CreateUserDto;
