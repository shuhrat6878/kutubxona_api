import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Borrow } from 'src/core/entity/borrow.entity';
import { Book } from 'src/core/entity/book.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';
import { User } from 'src/core/entity/user.entity';
import { BookAction } from 'src/common/enum';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import type { BookRepository } from 'src/core/repository/book.repository';
import type { BookHistoryRepository } from 'src/core/repository/book-history.repository';
import type { UserRepository } from 'src/core/repository/user.repository';

@Injectable()
export class BorrowService {
  delete(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Borrow) private borrowRepo: BorrowRepository,
    @InjectRepository(Book) private bookRepo: BookRepository,
    @InjectRepository(BookHistory) private historyRepo: BookHistoryRepository,
    @InjectRepository(User) private userRepo: UserRepository,
    private dataSource: DataSource,
  ) {}

  async borrowBook(bookId: string, userId: string) {
    console.log(userId, bookId)
    return this.dataSource.transaction(async (manager) => {
      const user = await manager.findOne(User, {
        
        where: { id: userId },
        relations: ['borrows'],
      });
      if (!user) throw new NotFoundException('User not found');

      const book = await manager.findOne(Book, { where: { id: bookId } });
      if (!book || !book.available){
        throw new BadRequestException('Book not found or not available');
      }
      if (user.borrows.length >= 3){
        throw new BadRequestException('Max 3 books allowed');
      }
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7);

      const borrow = manager.create(Borrow, {
        userId: user,
        bookId: book,
        borrow_date: new Date(),
        due_date: dueDate,
        overdue: false,
      });
      await manager.save(borrow);

      book.available = false;
      await manager.save(book);

      const history = manager.create(BookHistory, {
        bookId: book,
        userId: user,
        action: BookAction.BORROW,
        date: new Date(),
      });
      await manager.save(history);

      return borrow;
    });
  }

  async returnBook(borrowId: string) {
    return this.dataSource.transaction(async (manager) => {
      const borrow = await manager.findOne(Borrow, {
        where: { id: borrowId },
        relations: ['bookId', 'userId'],
      });
      if (!borrow) throw new NotFoundException('Borrow not found');

      borrow.return_date = new Date();
      if (borrow.return_date > borrow.due_date) borrow.overdue = true;
      await manager.save(borrow);

      borrow.bookId.available = true;
      await manager.save(borrow.bookId);

      const history = manager.create(BookHistory, {
        bookId: borrow.bookId,
        userId: borrow.userId,
        action: BookAction.RETURN,
        date: new Date(),
      });
      await manager.save(history);

      return borrow;
    });
  }

  async myBorrows(userId: string) {
    return this.borrowRepo.find({
      where: { userId: { id: userId } },
      relations: ['bookId'],
    });
  }
}
