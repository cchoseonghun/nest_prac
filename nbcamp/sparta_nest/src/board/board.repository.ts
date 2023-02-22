import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Article } from "./article.entity";

@Injectable()
export class ArticleRepository extends Repository<Article> {
  constructor(private dataSource: DataSource) {
    super(Article, dataSource.createEntityManager());
  }

  async getArticlesByViewCount() {
    const result = await this.createQueryBuilder()  // createQueryBuilder: raw query랑 최대한 흡사하게 작성해줌
      .select('articles')  // 선택할 테이블 지정
      .from(Article, 'articles')  // 테이블 이름과 별칭 설정
      .orderBy('articles.view', 'DESC')  // view 컬럼을 기준으로 결과를 내림차순
      .getMany();  // 쿼리를 실행하고 결과를 Article 객체의 배열로 반환
    return result;
  }
}