import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/core/entity/book.entity';
import { BaseService } from 'src/infrastructure/base/base.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import type { BookRepository } from 'src/core/repository/book.repository';
import { successRes } from 'src/infrastructure/response/success';

@Injectable()
export class BookService extends BaseService<
CreateBookDto,
UpdateBookDto, 
Book> {
constructor(
    @InjectRepository(Book)
    private readonly bookRepo: BookRepository,
  ) {
    super(bookRepo);
  }

async statistyBook() {
    const data = await this.bookRepo
      .createQueryBuilder("book")
      .leftJoin("book.histories", "history")
      .select("book.id", "bookId")
      .addSelect("book.title", "title")
      .addSelect("COUNT(history.id)", "buyurtma_soni")
      .groupBy("book.id")
      .addGroupBy("book.title")
      .orderBy("COUNT(history.id)", "DESC")
      .limit(5)
      .getRawMany();

    return successRes(data);
  }


  async statistyUser() {
    const data = await this.bookRepo
      .createQueryBuilder("book")
      .leftJoin("book.histories", "history")
      .leftJoin("history.userId", "user")
      .select("user.id", "userId")
      .addSelect("user.full_name", "full_name")
      .addSelect("COUNT(history.id)", "buyurtma_soni")
      .groupBy("user.id")
      .addGroupBy("user.full_name")
      .orderBy("COUNT(history.id)", "DESC")
      .limit(5)
      .getRawMany();

    return successRes(data);
  }

  async query(options: any) {
    return this.bookRepo.find(options);
  }

async bookHistory(id:string){
    const data=await this.bookRepo.findOne({where:{id},relations:{histories:true}})
    if(!data){
      throw new NotFoundException('Data not fount')
    }
    return successRes(data);
  }

}

