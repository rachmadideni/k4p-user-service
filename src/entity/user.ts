/* eslint-disable no-unused-vars */
import { BeforeInsert, Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
// import { RefreshToken } from '../entity/refreshToken'

export enum UserRole {
  GUEST = 'guest',
  ADMIN = 'admin',
  FINANCE = 'finance',
  CLIENT = 'client',
  DEVELOPER = 'developer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  firstName: string;

  @Column('varchar', {
    length: 150,
  })
  lastName: string;

  @Column('varchar', {
    length: 20,
  })
  phoneNumber: string;

  @Column('varchar', {
    length: 150,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 100,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUEST,
  })
  role: UserRole;

  @Column({
    default: false,
  })
  isEmailVerified: boolean;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  // @OneToMany( () => RefreshToken, (refreshToken) => refreshToken.userId)

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  isPasswordMatches(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
