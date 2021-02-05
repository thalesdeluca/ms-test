import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user';

@Entity()
class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @BeforeInsert()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export { Auth };
