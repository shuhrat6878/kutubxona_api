import { Controller, Post, Patch, Get, Param, Req, UseGuards, Delete } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/role.guard';
import { Roles } from 'src/common/enum';
import { AccessRoles } from 'src/common/decorator/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Borrow Api')
@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles( Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER)
  @Post(':bookId')
  @ApiBearerAuth()
  borrowBook(@Param('bookId') bookId: string, @Req() req: any) {
    return this.borrowService.borrowBook(bookId, req.user.id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles( Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER)
  @Patch(':id/return')
  @ApiBearerAuth()
  returnBook(@Param('id') id: string) {
    return this.borrowService.returnBook(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @AccessRoles( Roles.SUPERADMIN, Roles.ADMIN, Roles.LIBRARIAN, Roles.READER, 'ID')
  @Get('myBorrow')
  @ApiBearerAuth()
  Borrows(@Req() req: any) {
    return this.borrowService.myBorrows(req.user.id);
  }

  @AccessRoles(Roles.ADMIN, Roles.LIBRARIAN)
    @Delete('Delete:id')
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
      return this.borrowService.delete(id);
    }

}
