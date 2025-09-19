import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/database/base.entity';
import { User } from 'src/core/entity/user.entity';
import { Book } from 'src/core/entity/book.entity';
import { BookAction } from 'src/common/enum';


@Entity('book_history')
export class BookHistory extends BaseEntity {
  @ManyToOne(() => Book, (book) => book.histories, {
   onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'book_id' })
  bookId: Book;

  @ManyToOne(() => User, (user) => user.histories, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @Column({ type: 'enum', enum: BookAction, default: BookAction.BORROW })
  action: BookAction;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  date: Date;

}
