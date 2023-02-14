import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      // getAll()이 배열을 리턴하는지 안 하는지 테스트
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
    });
    it('should throw a NotFoundException', () => {
      const wrongId = 999;
      try {
        service.getOne(wrongId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        // expect(e.message).toEqual(`Movie with ID ${wrongId} not found.`)
      }
    });
  });

  describe('deleteOne', () => {
    it('deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });
    it('should throw a NotFoundException', () => {
      const wrongId = 999;
      try {
        service.deleteOne(wrongId);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });  // 이렇게 반복된다면 beforeEach에 넣는 방법도 있다.
      const updateData = {title: 'Updated Test'};
      service.update(1, updateData);
      const movie = service.getOne(1);
      expect(movie.title).toEqual(updateData.title);
    });
    it('should throw a NotFoundException', () => {
      const wrongId = 999;
      try {
        service.update(wrongId, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })
});
