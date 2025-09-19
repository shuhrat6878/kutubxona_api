import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookHistoryService } from './book-history.service';
import { CreateBookHistoryDto } from './dto/create-book-history.dto';
import { UpdateBookHistoryDto } from './dto/update-book-history.dto';
import { AccessRoles } from 'src/common/decorator/role.decorator';
import { Roles } from 'src/common/enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Book_History Api')
@Controller('book-history')
export class BookHistoryController {
  constructor(private readonly bookHistoryService: BookHistoryService) {}

  

  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Get('All')
  @ApiBearerAuth()
  findAll() {
    return this.bookHistoryService.findAll({relations:{bookId: true, userId: true}});
  }

  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Get('GetBYid:id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.bookHistoryService.findOneById(id, {relations:{bookId :true, userId: true}});
  }

  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Patch('Update:id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateBookHistoryDto: UpdateBookHistoryDto) {
    return this.bookHistoryService.update(id, updateBookHistoryDto);
  }

  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
  @Delete('Delete:id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.bookHistoryService.delete(id);
  }
}
