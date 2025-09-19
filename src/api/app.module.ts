import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "src/config";
import { JwtModule } from "@nestjs/jwt";
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { BookHistoryModule } from './book-history/book-history.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: config.DB_URL,
            synchronize: config.DB_SYNC,
            autoLoadEntities: true,
            entities: ['dist/core/entity*.entity{.ts,.js}']
        }),
        JwtModule.register({
            global: true,
        }),
        BookModule,
        BorrowModule,
        BookHistoryModule,
        UserModule
    ],
})

export class AppModule { }