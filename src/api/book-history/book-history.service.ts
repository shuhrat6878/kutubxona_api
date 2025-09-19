import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookHistory } from 'src/core/entity/book-history.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/infrastructure/base/base.service';
import { CreateBookHistoryDto } from './dto/create-book-history.dto';
import { UpdateBookHistoryDto } from './dto/update-book-history.dto';

@Injectable()
export class BookHistoryService extends BaseService<
CreateBookHistoryDto, 
UpdateBookHistoryDto, 
BookHistory> {
  constructor(
    @InjectRepository(BookHistory)
    private readonly historyRepository: Repository<BookHistory>,
  ) {
    super(historyRepository);
  }
}
