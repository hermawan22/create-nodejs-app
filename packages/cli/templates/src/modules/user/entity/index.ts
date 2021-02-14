import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public first_name: string;

  @Column()
  public last_name: string;

  @Column()
  public photo: string;

  @Column()
  public email: string;

  @Column()
  public password: string;
}

export default User;
