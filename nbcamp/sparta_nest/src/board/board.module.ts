import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { BoardController } from './board.controller';
import { ArticleRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [BoardController],
  providers: [BoardService, ArticleRepository]
})
export class BoardModule {}
