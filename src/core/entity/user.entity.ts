import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { Borrow } from 'src/core/entity/borrow.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';
import { Roles } from 'src/common/enum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  hashed_password: string; 

  @Column({ type: 'enum', enum: Roles, default: Roles.READER })
  role: Roles;

  @OneToMany(() => Borrow, (borrow) => borrow.userId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  borrows: Borrow[];

  @OneToMany(() => BookHistory, (histories) => histories.userId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  histories: BookHistory[];
}
