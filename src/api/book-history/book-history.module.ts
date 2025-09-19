import { Module } from '@nestjs/common';
import { BookHistoryService } from './book-history.service';
import { BookHistoryController } from './book-history.controller';
import { BookHistory } from 'src/core/entity/book-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookHistory])],
  controllers: [BookHistoryController],
  providers: [BookHistoryService],
})
export class BookHistoryModule {}
