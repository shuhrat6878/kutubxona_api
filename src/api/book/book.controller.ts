import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { AccessRoles } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryBookDto } from './dto/query.dto';

@ApiTags('Book Api')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Post('creatte book')
  @ApiBearerAuth()
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get('All')
  findAll() {
    return this.bookService.findAll({ relations: { histories: true, borrows: true } });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Get('bookHistory Id')
  @ApiBearerAuth()
  bookHistory(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.bookHistory(id)
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Get('UserStstistika')
  @ApiBearerAuth()
  statistikaUser() {
    return this.bookService.statistyUser()
  }

  @Get('BookStatistika')
  statistikaBook() {
    return this.bookService.statistyBook()
  }

  @Post('query')
  querry(@Query() querryDto: QueryBookDto) {
    const { title, author, published_year, available } = querryDto

    const where: any = {}

    if (title) where.title = title;
    if (author) where.author = author;
    if (published_year) where.published_year = published_year;
    if (available) where.available = available;

    return this.bookService.query({
      where,
      relations: { histories: true, borrows: true }
    })
  }


  @Get('getById')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id, { relations: { histories: true, borrows: true } });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN)
  @Put('UpdateId')
  @ApiBearerAuth()
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Delete('DeleteId')
  @ApiBearerAuth()
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.delete(id);
  }
}
