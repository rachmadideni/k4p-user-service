import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { File } from './file';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  dateOfBirth: Date;

  @Column('text')
  address: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => File)
  @JoinColumn()
  photo: File;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
