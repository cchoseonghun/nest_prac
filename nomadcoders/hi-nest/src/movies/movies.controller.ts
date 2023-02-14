import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  // 만약 TypeScript를 사용하지 않았다면 
  // 위처럼 Class만 import하는 방식으로는 동작하지 않았을 것이다.
  // movies.module.ts에서 
  // providers에 불러오는 모든 것들을 import해서 타입을 추가하는 것만으로 작동
  // 이걸 DI(Dependency Injection) 라고 부른다.
  //
  // movies.module.ts에서 providers를 두면
  // NestJS가 MoviesService를 import하고
  // Controller에 Inject(주입)한다.
  // MoviesService를 보면 Injectable이라는 decorator가 있는데
  // 없으면 에러 생김. Injectable을 직역하면 '주입 가능한'
  

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get('search')
  // search(@Query('year') searchingYear: string) {
  //   return `We are searching for a movie made after: ${searchingYear}`;
  // }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
