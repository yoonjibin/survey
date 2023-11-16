import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurveyEntity } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class SurveyUtil {
  private readonly logger = new Logger(SurveyUtil.name);
  constructor(
    @InjectRepository(SurveyEntity)
    private surveyRepository: Repository<SurveyEntity>,
  ) {}

  async checkSurveyExist(id: number) {
    const existingSurvey = await this.surveyRepository.exist({
      where: { id: id },
    });
    if (!existingSurvey) {
      this.logger.error(`Survey with ID ${id} not found`);
      throw new ApolloError('존재하지 않는 설문지입니다.', 'SURVEY_NOT_FOUND', {
        customErrorCode: 404,
        parameter: 'id',
      });
    }
  }
}
