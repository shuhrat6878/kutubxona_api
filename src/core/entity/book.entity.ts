import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { Borrow } from 'src/core/entity/borrow.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: string;

  @Column({ nullable: true, type: 'int' })
  published_year?: number;

  @Column({ default: true, type: 'boolean' })
  available: boolean;

  @OneToMany(() => Borrow, (borrow) => borrow.bookId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  borrows: Borrow[];

  @OneToMany(() => BookHistory, (histories) => histories.bookId, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  histories: BookHistory[];
}


