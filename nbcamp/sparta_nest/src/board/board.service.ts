import _ from 'lodash';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ArticleRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    // @InjectRepository(Article) private articleRepository: Repository<Article>,
    private articleRepository: ArticleRepository,
  ) {}

  async getArticles() {
    const cacheArticles = await this.cacheManager.get('articles');
    if (!_.isNil(cacheArticles)) {
      return cacheArticles;
    }

    const articles = await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'title', 'author', 'createdAt'],
    });
    await this.cacheManager.set('articles', articles);
    return articles;
  }

  async getArticleById(id) {
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['title', 'content', 'author', 'createdAt', 'updatedAt'],
    });
  }

  async getHotArticles() {
    return await this.articleRepository.getArticlesByViewCount();
  }

  createArticle(title: string, content: string, password: number) {
    this.articleRepository.insert({
      author: 'test',
      title,
      content,
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    await this.verifyPassword(id, password);
    this.articleRepository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    await this.verifyPassword(id, password);
    this.articleRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: number) {
    // 굳이 노출될 필요 없는 메소드는 private하게
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });
    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id: ' + id);
    }
    if (article.password !== password.toString()) {
      throw new UnauthorizedException(`Password is not corrected. id: ${id}`);
    }
  }
}
