import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import { User } from './user';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  token: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  expireAt: Date;

  isExpired() {
    return this.expireAt.getTime() < new Date().getTime();
  }

  createToken() {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + 3600);
  }
}
