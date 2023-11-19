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

  async getSurveyById(id: number) {
    await this.checkSurveyExist(id);
    return this.surveyRepository.findOne({ where: { id: id } });
  }

  async checkUnansweredQuestions(surveyId: number) {
    const unansweredQuestions = await this.surveyRepository
      .createQueryBuilder('survey')
      .leftJoinAndSelect('survey.question', 'question')
      .leftJoin('question.choice', 'choice')
      .leftJoin('choice.answer', 'answer')
      .where('survey.id = :surveyId', { surveyId })
      .andWhere('answer.id IS NULL')
      .getMany();

    const unansweredQuestionIdsList = unansweredQuestions
      .map((survey) => survey.question)
      .flat();
    if (unansweredQuestionIdsList.length > 0) {
      this.logger.error(
        `No answers found for survey with ID ${unansweredQuestionIdsList[0].id}`,
      );
      throw new ApolloError(
        `${unansweredQuestions[0].id}번 문항에 답변이 존재하지 않습니다.`,
        'ANSWER_NOT_FOUND',
        {
          customErrorCode: 404,
          parameter: 'id',
        },
      );
    }
  }
}
